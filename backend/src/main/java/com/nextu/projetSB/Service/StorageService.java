package com.nextu.projetSB.Service;

import com.nextu.projetSB.Entities.Bucket;
import com.nextu.projetSB.Entities.FileData;
import com.nextu.projetSB.Entities.User;
import com.nextu.projetSB.Exceptions.FileContentException;
import com.nextu.projetSB.Repositories.BucketRepository;
import com.nextu.projetSB.Repositories.FileRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StorageService {
    @Value("${BucketProject.filestore}")
    private String SERVER_LOCATION;
    private Path root;
    private final Logger logger = LoggerFactory.getLogger(StorageService.class);
    private final FileRepository fileRepository;
    private final BucketService bucketService;
    private final BucketRepository bucketRepository;

    // Initialise le service en créant le dossier de stockage s'il n'existe pas déjà.
    @PostConstruct
    public void init() {
        try {
            this.root = Paths.get(SERVER_LOCATION);
            Files.createDirectory(root);
        } catch (IOException e) {
            logger.warn("Le dossier de stockage existe déjà.");
        }
    }

    // Sauvegarde le fichier et retourne le nom du fichier sauvegardé.

    public String save(MultipartFile file, String bucketId, String user) throws FileContentException {
        return copyFile(file, bucketId, user);
    }

    // Effectue la copie réelle du fichier dans le dossier de stockage et le sauvegarde en base de données.
    private String copyFile(MultipartFile file, String bucketId, String userId) throws FileContentException {
        var fileNameDest = FileUtils.generateStringFromDate(FileUtils.getExtension(file.getOriginalFilename()));
        String filePathDest = SERVER_LOCATION + fileNameDest;

        try {
            Files.copy(file.getInputStream(), this.root.resolve(fileNameDest));
            FileData newFile = new FileData();
            newFile.setFileName(file.getOriginalFilename());
            newFile.setLabel(fileNameDest);
            newFile.setPathFile(filePathDest);
            newFile.setUserId((userId));
            Bucket bucket = bucketService.findById(bucketId);
            bucket.addFile(fileRepository.save(newFile));
            bucketRepository.save(bucket);
            return fileNameDest;
        } catch (Exception e) {
            logger.error("Une exception s'est produite lors de la sauvegarde du fichier : {}", e.getMessage());
            throw new FileContentException("Impossible de stocker le fichier. Erreur : " + e.getMessage());
        }
    }

    // Récupère un fichier en utilisant le chemin du fichier.
    public File load(String filename) throws IOException {
        return new File(SERVER_LOCATION + filename);
    }

    // Récupère les 10 fichiers les plus récents pour un utilisateur donné.
    public List<FileData> getRecentFilesByUserId(String userId) {
        return fileRepository.findTop5ByUserIdOrderByLocalDateTimeAsc(userId);
    }

    // Vérifie si un fichier avec le nom donné existe dans le référentiel.
    public boolean checkIfFileExist(String fileName) {
        // Utilise le repository pour rechercher un fichier par son label (nom)
        return fileRepository.findByLabel(fileName) != null;
        // Retourne true si un fichier correspondant est trouvé, sinon false
    }

    // Supprime le fichier du dossier de stockage sur l'ordinateur.
    public void deleteFileInStorage(String fileName) throws IOException {
        Path filePath = Paths.get(SERVER_LOCATION + "/" + fileName);
        Files.deleteIfExists(filePath);
    }

    // Supprime tout les fichiers appartenant à un bucket du dossier storage
    public void deleteFilesBelongingToBucket(String bucketId) {
        try {
            Bucket bucket = bucketRepository.findById(bucketId).orElse(null);
            if (bucket != null) {
                List<FileData> fileList = bucket.getFiles();
                for (FileData file : fileList) {
                    String fileName = file.getLabel();
                    deleteFileInStorage(fileName);
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la suppression dzq fichiers dans storage", ex);
        }
    }
}
