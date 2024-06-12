package com.nextu.projetSB.Entities;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

    @Document
    @NoArgsConstructor
    @Data
    public class User {
        @Id
        private String id;
        private String firstName;
        private String lastName;

        @Indexed(unique = true)
        private String login;
        private String password;

        @DocumentReference
        private List<Bucket> buckets;

        public void addBucket(Bucket bucket) {
            if (this.buckets == null) {
                this.buckets = new ArrayList<>();
            }
            this.buckets.add(bucket);
        }
    }

