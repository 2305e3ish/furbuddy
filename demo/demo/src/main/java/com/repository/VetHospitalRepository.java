package com.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.VetHospital;
@Repository
public interface VetHospitalRepository extends JpaRepository<VetHospital, Integer> {
}