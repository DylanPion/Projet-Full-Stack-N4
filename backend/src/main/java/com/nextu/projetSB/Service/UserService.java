package com.nextu.projetSB.Service;

import com.mongodb.DuplicateKeyException;
import com.nextu.projetSB.Dto.UserCreateDTO;
import com.nextu.projetSB.Dto.UserGetDTO;
import com.nextu.projetSB.Entities.FileData;
import com.nextu.projetSB.Entities.SignUpRequest;
import com.nextu.projetSB.Entities.User;
import com.nextu.projetSB.Exceptions.UserException;
import com.nextu.projetSB.Repositories.FileRepository;
import com.nextu.projetSB.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final PasswordEncoder encoder;


    // Inscript utilisateur
    public User registerUser(SignUpRequest signUpRequest){
        try {
            User user = new User();
            user.setLogin(signUpRequest.getLogin());
            user.setPassword(encoder.encode(signUpRequest.getPassword()));
            user.setLastName(signUpRequest.getLastName());
            user.setFirstName(signUpRequest.getFirstName());

            userRepository.save(user);
            return user;

        }   catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la création de l'utilisateur", ex);
        }
    }
    public boolean isUserExists(String email) {
        return userRepository.findByLogin(email) != null;
    }

    // Récupère un utilisateur grâce à son ID.
    public User findUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    // Récupère un utilisateur par son ID et le retourne sous forme de DTO.
    public UserGetDTO findById(String id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        return getUserGetDTO(user);
    }

    // Crée un utilisateur et retourne ses informations sous forme de DTO.
    public User create(UserCreateDTO userDTO) {
            User user = new User();
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setLogin(userDTO.getLogin());
            user.setPassword(encoder.encode(userDTO.getPassword()));
            userRepository.save(user);
            return user;
    }

    // Modifie un utilisateur existant.
    public UserCreateDTO update(String id, UserCreateDTO userCreateDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec l'ID: " + id));

        try {
            // Met à jour les informations de l'utilisateur
            user.setFirstName(userCreateDTO.getFirstName());
            user.setLastName(userCreateDTO.getLastName());
            user.setLogin(userCreateDTO.getLogin());
            user.setPassword(userCreateDTO.getPassword());

            userRepository.save(user);
            return userCreateDTO;
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la modification de l'utilisateur", ex);
        }
    }

    // Met à jour l'utilisateur à partir d'un objet User.
    public User updateUser(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la mise à jour de l'utilisateur", ex);
        }
    }

    //Supprime un utilisateur par son ID.
    public void deleteById(String id) {
        try {
            userRepository.deleteById(id);
        } catch (Exception ex) {
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur", ex);
        }
    }


     //Sauvegarde un fichier lié à l'utilisateur.
  /*  public void saveFileByUserId(String userId, String fileName) throws Exception {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            FileData file = new FileData();
            file.setLabel(fileName);
            FileData fileSaved = fileRepository.save(file);
            user.addFile(fileSaved);
            userRepository.save(user);
        } else {
            throw new Exception("La sauvegarde du fichier pour l'utilisateur :" + userId + " a rencontré une erreur");
        }
    }
*/
    //Crée un objet UserGetDTO à partir d'un objet User.
    private static UserGetDTO getUserGetDTO(User user) {
        UserGetDTO userGetDTO = new UserGetDTO();
        userGetDTO.setId(user.getId());
        userGetDTO.setFirstName(user.getFirstName());
        userGetDTO.setLastName(user.getLastName());
        userGetDTO.setLogin(user.getLogin());
        return userGetDTO;
    }
}
