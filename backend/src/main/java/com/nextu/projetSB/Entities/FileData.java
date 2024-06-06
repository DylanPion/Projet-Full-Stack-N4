package com.nextu.projetSB.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
@Data
@NoArgsConstructor
public class FileData {
    @Id
    private String id;
    private String fileName;
    private String label;
    private String pathFile;
    private LocalDateTime localDateTime = LocalDateTime.now();
    @Version
    private Long version;
    private String userId;
}
