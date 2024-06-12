package com.nextu.projetSB.Controller;

import com.nextu.projetSB.Entities.*;
import com.nextu.projetSB.Exceptions.TokenRefreshException;
import com.nextu.projetSB.Repositories.UserRepository;
import com.nextu.projetSB.Service.JwtService;
import com.nextu.projetSB.Service.RefreshTokenService;
import com.nextu.projetSB.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService  userService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    // Url de test au backend
    @GetMapping("/test")
    public String test() {
        return "{\"message\": \"test\"}";
    }

    //Endpoint pour l'inscription d'un nouvel utilisateur.
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        User user = userService.registerUser(signUpRequest);
        return ResponseEntity.ok().body(user);
    }

    //Endpoint pour l'authentification d'un utilisateur (connexion).
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword()));

        // Définit l'authentication dans le contexte de sécurité
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateJwtToken(authentication);

        // Récupère les détails de l'utilisateur authentifié
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Récupération des rôles de l'utilisateur
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Génération du token de rafraichissement
       String refreshToken = refreshTokenService.generateRefreshToken(userDetails);

        // Retourne une réponse avec les informations du token JWT et de l'utilisateur
        return ResponseEntity.ok(new JwtResponse(jwt,
                refreshToken,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getFirstName(),
                roles));
    }

    // Endpoint pour raffrachir le token
    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateTokenFromUsername(user.getLogin());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }
}

