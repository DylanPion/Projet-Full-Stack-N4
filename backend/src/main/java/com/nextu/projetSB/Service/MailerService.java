package com.nextu.projetSB.Service;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class MailerService {
    @Value("${mailer-uri}")
    private String MAILER_URI;

    /*public void sendEmail(String emailAddress){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonBody = "{\"email\": \"" + emailAddress + "\"}";
        HttpEntity entity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            Object res = restTemplate.exchange(MAILER_URI, HttpMethod.POST, entity, Object.class);
            System.out.println("Email sent successfully.");
        } catch (RestClientException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    } */

    public void sendEmail(String emailAddress) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String jsonBody = "{\"email\": \"" + emailAddress + "\"}";
            HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
            ResponseEntity<Object> responseEntity = restTemplate.postForEntity(MAILER_URI, requestEntity, Object.class);
            System.out.println("Email sent successfully.");
        } catch (RestClientException e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
