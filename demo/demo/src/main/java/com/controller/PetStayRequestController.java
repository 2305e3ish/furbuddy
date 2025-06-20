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
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/pet-stay-requests")
public class PetStayRequestController {

    @Autowired
    private PetStayRequestRepository petStayRequestRepository;

    @GetMapping
    public List<PetStayRequest> getAllRequests() {
        return petStayRequestRepository.findAll();
    }

    @PostMapping
    public PetStayRequest requestStay(@RequestBody PetStayRequest petStayRequest) {
        return petStayRequestRepository.save(petStayRequest);
    }

    @GetMapping("/filter")
    public List<PetStayRequest> getRequestsByStayType(@RequestParam String stayType) {
        return petStayRequestRepository.findAll().stream()
            .filter(request -> request.getStayType().equalsIgnoreCase(stayType))
            .collect(Collectors.toList());
    }
}
