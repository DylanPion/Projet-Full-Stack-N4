package com.nextu.projetSB.Entities;

import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class SignUpRequest {
    @Indexed(unique = true)
    private String login;
    private String password;
    private String firstName;
    private String lastName;
}

