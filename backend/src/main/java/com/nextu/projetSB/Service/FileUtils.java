package com.nextu.projetSB.Service;

import com.nextu.projetSB.Exceptions.FileContentException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

public class FileUtils {

    // Constructeur privé pour empêcher l'instanciation de la classe.
    private FileUtils() {}

    //Obtient l'extension d'un fichier à partir de son nom.
    public static Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

    // Génère une chaîne de caractères à partir de la date actuelle et de l'extension du fichier.
    public static String generateStringFromDate(String ext) {
        return new SimpleDateFormat("yyyyMMddhhmmss'." + ext + "'").format(new Date());
    }

    //Obtient l'extension d'un fichier à partir de son nom et lève une exception si elle n'est pas présente.
    public static String getExtension(String filename) throws FileContentException {
        return FileUtils.getExtensionByStringHandling(filename)
                .orElseThrow(() -> new FileContentException("Post not created, bad file extension"));
    }
}
