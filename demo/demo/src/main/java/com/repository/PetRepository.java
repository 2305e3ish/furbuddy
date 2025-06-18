package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByPetTypeContainingIgnoreCaseAndBreedContainingIgnoreCaseAndOwnerNameContainingIgnoreCase(
        String petType, String breed, String ownerName
    );
}