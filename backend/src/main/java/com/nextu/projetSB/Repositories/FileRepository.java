package com.nextu.projetSB.Repositories;

import com.nextu.projetSB.Entities.FileData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface FileRepository extends MongoRepository<FileData,String> {
    FileData findByLabel(String fileName);
    @Query("{'userId': ?0}")
    List<FileData> findTop5ByUserIdOrderByLocalDateTimeAsc(String userId);
}