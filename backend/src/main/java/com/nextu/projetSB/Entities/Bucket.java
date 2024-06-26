package com.nextu.projetSB.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Bucket {
    @Id
    private String id;
    private String label;
    private String description;
    @DocumentReference
    private List<FileData> files;

    public void addFile(FileData fileData){
        if(this.files==null){
            this.files = new ArrayList<>();
        }
        this.files.add(fileData);
    }
}
