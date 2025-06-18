package com.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.entity.Pet;
import com.repository.PetRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    // Path for image storage (absolute, no folder duplication)
    private static final String IMAGE_DIR = "C:/Users/sduna/Documents/GitHub/furbuddy/demo/demo/src/main/resources/static/images";

    // Show all pets
    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    // Add a pet
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> addPet(
        @RequestParam String ownerName,
        @RequestParam String mobileNumber,
        @RequestParam String address,
        @RequestParam String petType,
        @RequestParam String breed,
        @RequestParam int age,
        @RequestParam String gender, // Add this parameter
        @RequestParam MultipartFile petImage
    ) {
        Pet pet = new Pet();
        pet.setOwnerName(ownerName);
        pet.setMobileNumber(mobileNumber);
        pet.setAddress(address);
        pet.setPetType(petType);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender); // Set gender
        String fileName = petImage.getOriginalFilename();
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new RuntimeException("No image file provided");
        }
        try {
            Path imagesDir = Paths.get(IMAGE_DIR);
            if (!Files.exists(imagesDir)) {
                Files.createDirectories(imagesDir);
            }
            Path imagePath = imagesDir.resolve(fileName);
            // Avoid overwriting existing files
            int count = 1;
            String baseName = fileName;
            String extension = "";
            int dotIndex = fileName.lastIndexOf('.');
            if (dotIndex > 0) {
                baseName = fileName.substring(0, dotIndex);
                extension = fileName.substring(dotIndex);
            }
            while (Files.exists(imagePath)) {
                fileName = baseName + "_" + count + extension;
                imagePath = imagesDir.resolve(fileName);
                count++;
            }
            Files.copy(petImage.getInputStream(), imagePath);
            System.out.println("Saved image: " + imagePath.toAbsolutePath() + ", size: " + petImage.getSize());

            pet.setPetImage(fileName);
            return ResponseEntity.ok(petRepository.save(pet));
        } catch (java.nio.file.FileAlreadyExistsException e) {
            throw new RuntimeException("File already exists: " + fileName, e);
        } catch (java.io.IOException e) {
            throw new RuntimeException("Failed to save image file", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save image", e);
        }
    }

    // Show pet(s) based on filters (all fields)
    @GetMapping("/search")
    public List<Pet> searchPets(
            @RequestParam(required = false) String petType,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String ownerName,
            @RequestParam(required = false) String mobileNumber,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String petImage,
            @RequestParam(required = false) Integer age
    ) {
        List<Pet> allPets = petRepository.findAll();
        List<Pet> filtered = new ArrayList<>();
        for (Pet pet : allPets) {
            if ((petType == null || pet.getPetType().toLowerCase().contains(petType.toLowerCase())) &&
                (breed == null || pet.getBreed().toLowerCase().contains(breed.toLowerCase())) &&
                (ownerName == null || pet.getOwnerName().toLowerCase().contains(ownerName.toLowerCase())) &&
                (mobileNumber == null || pet.getMobileNumber().toLowerCase().contains(mobileNumber.toLowerCase())) &&
                (address == null || pet.getAddress().toLowerCase().contains(address.toLowerCase())) &&
                (name == null || (pet.getName() != null && pet.getName().toLowerCase().contains(name.toLowerCase()))) &&
                (petImage == null || pet.getPetImage().toLowerCase().contains(petImage.toLowerCase())) &&
                (age == null || pet.getAge() == age)
            ) {
                filtered.add(pet);
            }
        }
        return filtered;
    }

    // Delete a pet
    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        petRepository.deleteById(id);
    }

    // Edit a pet detail
    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet updatedPet) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(updatedPet.getName());
            pet.setBreed(updatedPet.getBreed());
            pet.setAge(updatedPet.getAge());
            pet.setOwnerName(updatedPet.getOwnerName());
            pet.setMobileNumber(updatedPet.getMobileNumber());
            pet.setAddress(updatedPet.getAddress());
            pet.setPetType(updatedPet.getPetType());
            pet.setPetImage(updatedPet.getPetImage());
            return petRepository.save(pet);
        }).orElseGet(() -> {
            updatedPet.setId(id);
            return petRepository.save(updatedPet);
        });
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get(IMAGE_DIR).resolve(filename);
        Resource resource = new UrlResource(imagePath.toUri());
        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(imagePath))
                .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}