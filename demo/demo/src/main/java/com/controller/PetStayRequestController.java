package com.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.PetStayRequest;
import com.repository.PetStayRequestRepository;
import com.service.EmailService;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/pet-stay-requests")
public class PetStayRequestController {

    @Autowired
    private PetStayRequestRepository petStayRequestRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<PetStayRequest> getAllRequests() {
        return petStayRequestRepository.findAll();
    }

    @PostMapping
    public PetStayRequest requestStay(@RequestBody PetStayRequest petStayRequest) {
        PetStayRequest savedRequest = petStayRequestRepository.save(petStayRequest);
        // Send email to the user (host) for pet stay request
        if (petStayRequest.getOwner() != null && petStayRequest.getOwner().getEmail() != null) {
            String details = "A new pet stay request has been submitted.\n" +
                "Start Date: " + petStayRequest.getStartDate() + "\n" +
                "End Date: " + petStayRequest.getEndDate() + "\n" +
                "Messages: " + petStayRequest.getMessages() + "\n" +
                "Stay Type: " + petStayRequest.getStayType();
            emailService.sendPetStayRequestEmail(petStayRequest.getOwner().getEmail(), details);
        }
        return savedRequest;
    }

    @GetMapping("/filter")
    public List<PetStayRequest> getRequestsByStayType(@RequestParam String stayType) {
        return petStayRequestRepository.findAll().stream()
            .filter(request -> request.getStayType().equalsIgnoreCase(stayType))
            .collect(Collectors.toList());
    }
}
