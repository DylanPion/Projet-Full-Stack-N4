package com.nextu.projetSB.Repositories;

import com.nextu.projetSB.Entities.FileData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FileRepository extends MongoRepository<FileData,String> {
    FileData findByLabel(String fileName);
}