package com.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.VetHospital;
import com.repository.VetHospitalRepository;
@Service
public class VetHospitalService {
@Autowired
private VetHospitalRepository vetHospitalRepository;
// Fetch all vet hospitals
public List<VetHospital> getAllVetHospitals() {
return vetHospitalRepository.findAll();
}
// Search vet hospitals by keyword
public List<VetHospital> searchVetHospitals(String keyword) {
return vetHospitalRepository.findAll().stream()
.filter(hospital -> hospital.getName().toLowerCase().contains(keyword.toLowerCase()) ||
hospital.getAddress().toLowerCase().contains(keyword.toLowerCase()))
.toList();
}
// Add a new vet hospital
public VetHospital addVetHospital(VetHospital vetHospital) {
return vetHospitalRepository.save(vetHospital);
}
}