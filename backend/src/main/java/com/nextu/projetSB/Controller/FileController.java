package com.nextu.projetSB.Controller;

import com.nextu.projetSB.Entities.Bucket;
import com.nextu.projetSB.Entities.FileData;
import com.nextu.projetSB.Entities.User;
import com.nextu.projetSB.Entities.UserDetailsImpl;
import com.nextu.projetSB.Exceptions.FileContentException;
import com.nextu.projetSB.Repositories.FileRepository;
import com.nextu.projetSB.Service.*;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@Slf4j
public class FileController {
    private final UserService userService;
    private final StorageService storageService;
    private final BucketService bucketService;
    private final FileRepository fileRepository;

    //Endpoint pour récupérer un fichier par son nom.
    @GetMapping(value = "/{name}")
    public ResponseEntity<?> find(@PathVariable String name) {

        // Vérifie si le fichier existe
        if (storageService.checkIfFileExist(name)) {
            try {
                // Charge le fichier à partir du service de stockage
                File file = this.storageService.load(name);
                // Récupère l'extension du fichier
                var extension = FileUtils.getExtension(file.getName());
                // Obtient le chemin du fichier
                Path path = Paths.get(file.getAbsolutePath());
                // Crée une ressource ByteArray à partir du contenu du fichier
                ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
                // Retourne une ResponseEntity avec le contenu du fichier et les informations de type MIME
                return ResponseEntity
                        .ok()
                        .contentLength(path.toFile().length())
                        .contentType(MediaType.parseMediaType(MimeTypeUtils.getMimeType(extension)))
                        .body(resource);
            } catch (Exception e) {
                // En cas d'erreur lors de la lecture du fichier, renvoie une réponse 500 (Internal Server Error)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        // Si le fichier n'existe pas, renvoie une réponse 404 (Not Found)
        return ResponseEntity.notFound().build();
    }

    //Endpoint pour sauvegarder un fichier
    @PostMapping("/save/{bucketId}")
    public ResponseEntity<String> saveFileForUser(@RequestPart("file") MultipartFile file, @PathVariable String bucketId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        // Vérifie si le fichier est vide
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Le fichier est vide");
        }
        try {
            // Utilisez la méthode save pour sauvegarder le fichier
            String fileNameDest = storageService.save(file, bucketId, user.getId().toString());
            return ResponseEntity.ok("Le fichier '" + fileNameDest + "' a été téléchargé avec succès.");
        } catch (FileContentException e) {
            throw new RuntimeException(e);
        }
    }

    // Récupère la liste des fichiers d'un utilisateur à partir de l'identifiant du bucket.
    @GetMapping(value = "/{bucketId}", produces = {"application/json", "application/xml"})
    public ResponseEntity<List<FileData>> getUserFiles(@PathVariable String bucketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        try {
            Bucket bucket = bucketService.findById(bucketId);
            List<FileData> fileList = bucket.getFiles();
            return ResponseEntity.ok(fileList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Récupère les dix fichiers les plus récents
    @GetMapping("/recent")
    public List<FileData> getRecentFilesForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        return storageService.getRecentFilesByUserId(user.getId().toString());
    }

    // Supprime un fichier
    @DeleteMapping("/{fileId}")
    public void deleteById(@PathVariable String fileId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        try {
            FileData fileData = fileRepository.findById(fileId).orElse(null);
            if (fileData != null) {
                storageService.deleteFileInStorage(fileData.getLabel());
                fileRepository.deleteById(fileId);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la suppression du fichier", ex);
        }
    }
}
