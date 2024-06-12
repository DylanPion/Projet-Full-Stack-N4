package com.nextu.projetSB.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/* Configuration Java pour la négotiation de contenu dans les réponses HTTP du serveur.

Négotation de contenu : Processus qui détermine le type de contenu (XML,JSON) que le serveur doit renvoyer à une requête client
Interface WebMvcConfigurer : Interface qui permet de personnaliser la configuration de Spring MVC
 */

@Configuration
@EnableWebMvc
public class WebConfigurer implements WebMvcConfigurer {

    @Value("${react.host}")
    private String authorizeUrl;
    @Value("${react.port}")
    private String authorizedPort;
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
    /*
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String urlToBeAuthorize = "http://"+authorizeUrl;
        if(authorizedPort!=null && !authorizedPort.isEmpty()){
            urlToBeAuthorize =urlToBeAuthorize +":"+authorizedPort;
        }
        registry.addMapping("/**").allowedOrigins(
                urlToBeAuthorize,
                "http://nextudrive.com",
                "https://nextudrive.com",
                "http://nextudrive.com/api",
                "https://nextudrive.com/api"
        );
    }
    */
}







