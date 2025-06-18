package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.entity.PetStayRequest;
import com.repository.PetStayRequestRepository;

import java.util.List;
import java.util.stream.Collectors;

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
