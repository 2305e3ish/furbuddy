package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @jakarta.persistence.Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @jakarta.persistence.Column(name = "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

    @jakarta.persistence.Column(name = "address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @jakarta.persistence.Column(name = "pet_type", nullable = false, length = 50)
    private String petType;

    @jakarta.persistence.Column(name = "pet_breed", nullable = false, length = 100)
    private String breed;

    @jakarta.persistence.Column(name = "pet_image", nullable = false, length = 255)
    private String petImage;

    private int age;

    private String gender; // Add this field

    private String email; // Add this field

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPetType() {
        return petType;
    }

    public void setPetType(String petType) {
        this.petType = petType;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getPetImage() {
        return petImage;
    }

    public void setPetImage(String petImage) {
        this.petImage = petImage;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age2) {
        this.age = age2;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}