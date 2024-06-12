package com.nextu.projetSB.Controller;

import com.nextu.projetSB.Dto.BucketDTO;
import com.nextu.projetSB.Entities.Bucket;
import com.nextu.projetSB.Entities.User;
import com.nextu.projetSB.Entities.UserDetailsImpl;
import com.nextu.projetSB.Service.MailerService;
import com.nextu.projetSB.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RequestMapping(value = "/api/mailer")
@RestController
@RequiredArgsConstructor
public class MailerController {
    private final MailerService mailerService;
    private final UserService userService;

    @PostMapping(value = "/", produces = { "application/json", "application/xml" })
    public String sendEmail(@RequestBody String emailAdress) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());
        System.out.println(emailAdress);
        mailerService.sendEmail(emailAdress);
        return "Email sending request received.";
    }
}
