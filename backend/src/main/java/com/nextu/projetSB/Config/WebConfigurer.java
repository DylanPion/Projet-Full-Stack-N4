package com.nextu.projetSB.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/* Configuration Java pour la négotiation de contenu dans les réponses HTTP du serveur.

Négotation de contenu : Processus qui détermine le type de contenu (XML,JSON) que le serveur doit renvoyer à une requête client
Interface WebMvcConfigurer : Interface qui permet de personnaliser la configuration de Spring MVC
 */

@Configuration
public class WebConfigurer implements WebMvcConfigurer {
    @Override
    public void configureContentNegotiation(final ContentNegotiationConfigurer configurer) {
        configurer.favorParameter(false)
                .parameterName("mediaType")
                .ignoreAcceptHeader(false)
                .useRegisteredExtensionsOnly(false)
                .defaultContentType(MediaType.APPLICATION_JSON)
                .mediaType("xml", MediaType.APPLICATION_XML)
                .mediaType("json", MediaType.APPLICATION_JSON);
    }
}






