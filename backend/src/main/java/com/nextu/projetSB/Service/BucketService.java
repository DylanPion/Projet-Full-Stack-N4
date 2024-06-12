package com.nextu.projetSB.Service;

import com.nextu.projetSB.Dto.BucketDTO;
import com.nextu.projetSB.Entities.Bucket;
import com.nextu.projetSB.Entities.FileData;
import com.nextu.projetSB.Repositories.BucketRepository;
import com.nextu.projetSB.Repositories.FileRepository;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BucketService {
    private final BucketRepository bucketRepository;
    private final FileRepository fileRepository;

    // Validation d'entrer sur le bucket
    private void validateBucketDTO(BucketDTO bucketDTO) {
        Objects.requireNonNull(bucketDTO, "BucketDTO ne peut pas être null");
        if (bucketDTO.getLabel().isEmpty()) {
            throw new IllegalArgumentException("Le label du bucket ne peut pas être vide");
        }
    }

    // Création d'un nouveau bucket
    public BucketDTO create(BucketDTO bucketDTO) {
        try {
            validateBucketDTO(bucketDTO);

            Bucket bucket = new Bucket();
            bucket.setLabel(bucketDTO.getLabel());
            Bucket bucketAfterSave = bucketRepository.save(bucket);
            bucketDTO.setId(bucketAfterSave.getId());

            return bucketDTO;
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Violation de contrainte d'intégrité lors de la création du bucket", ex);
        } catch (ConstraintViolationException ex) {
            throw new RuntimeException("Violation de contrainte lors de la création du bucket", ex);
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la création du bucket", ex);
        }
    }

    //Récupère un Bucket par son ID.
    public Bucket findById(String id) {
        return bucketRepository.findById(id).orElse(null);
    }

    // Met à jour le Bucket
    public Bucket update(String id, BucketDTO bucketDTO) {
        Bucket bucket = bucketRepository.findById(id).orElse(null);

        if (bucket == null) throw new IllegalArgumentException("Bucket non trouvé avec l'ID:" + id);

        try {
            bucket.setLabel(bucketDTO.getLabel());
            Bucket bucketAfterUpdate = bucketRepository.save(bucket);
            return bucketAfterUpdate;
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la modification du Bucket", ex);
        }
    }

    //Supprime un Bucket à partir de son ID
    public void deleteBucketAndHisFile(String bucketId) {
        try {
            Bucket bucket = bucketRepository.findById(bucketId).orElse(null);
            if (bucket != null) {
                List<FileData> fileList = bucket.getFiles();
                for (FileData file : fileList) {
                    String fileId = file.getId();
                    // Supprimer chaque fichier associé au bucket
                    fileRepository.deleteById(fileId);
                }
                // Ensuite, supprimer le bucket
                bucketRepository.deleteById(bucketId);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la suppression du Bucket", ex);
        }
    }
}

