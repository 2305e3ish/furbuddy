package com.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.VetHospital;
import com.service.VetHospitalService;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/vethospitals")
public class VetHospitalController {
@Autowired
private VetHospitalService vetHospitalService;
@GetMapping
public List<VetHospital> getAllVetHospitals() {
return vetHospitalService.getAllVetHospitals();
}
@GetMapping("/search")
public List<VetHospital> searchVetHospitals(@RequestParam String keyword) {
return vetHospitalService.searchVetHospitals(keyword);
}
@PostMapping
public VetHospital addVetHospital(@RequestBody VetHospital vetHospital) {
return vetHospitalService.addVetHospital(vetHospital);
}
}