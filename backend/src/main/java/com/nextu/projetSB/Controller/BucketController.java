package com.nextu.projetSB.Controller;

import com.nextu.projetSB.Dto.BucketDTO;
import com.nextu.projetSB.Dto.UserCreateDTO;
import com.nextu.projetSB.Entities.Bucket;
import com.nextu.projetSB.Entities.User;
import com.nextu.projetSB.Entities.UserDetailsImpl;
import com.nextu.projetSB.Service.BucketService;
import com.nextu.projetSB.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/buckets")
public class BucketController {
    private final BucketService bucketService;
    private final UserService userService;

    //Crée un nouveau Bucket pour l'utilisateur.
    @PostMapping(value = "/", produces = { "application/json", "application/xml" })
    public ResponseEntity<?> create(@RequestBody BucketDTO bucketDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        bucketService.create(bucketDTO);
        Bucket bucket = bucketService.findById(bucketDTO.getId());
        user.addBucket(bucket);
        userService.updateUser(user);
        return ResponseEntity.ok(null);
    }

    // Récupère un Bucket à partir de son ID.
    @GetMapping(value = "/{bucketId}", produces = { "application/json", "application/xml" })
    public ResponseEntity<Bucket> getBucketById(@PathVariable String bucketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());
        Bucket bucket = bucketService.findById(bucketId);
        return ResponseEntity.ok(bucket);
    }

    // Récupère la liste complète des buckets de l'utilisateur.
    @GetMapping(value = "/", produces = { "application/json", "application/xml" })
    public ResponseEntity<List<Bucket>> getAllBuckets() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());
        List<Bucket> buckets = user.getBuckets();
        return ResponseEntity.ok(buckets);
    }

    // Met à jour un Bucket existant pour l'utilisateur.
    @PutMapping(value = "/{id}", produces = { "application/json", "application/xml" })
    public ResponseEntity<String> update(@PathVariable String id, @RequestBody BucketDTO bucketDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        Bucket bucketUpdate = bucketService.update(id, bucketDTO);
        Bucket bucket = bucketService.findById(bucketUpdate.getId());
        user.addBucket(bucket);
        userService.updateUser(user);
        return ResponseEntity.ok(null);
    }

    //Supprime un Bucket pour l'utilisateur.
    @DeleteMapping(value = "/{bucketId}", produces = { "application/json", "application/xml" })
    public ResponseEntity<?> delete(@PathVariable String bucketId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findUserById(userDetails.getId());

        bucketService.deleteById(bucketId);
        userService.updateUser(user);
        return ResponseEntity.ok(null);
    }
}
