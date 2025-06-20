package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.PetStayRequest;

@Repository
public interface PetStayRequestRepository extends JpaRepository<PetStayRequest, Long> {
    // Add custom query methods if needed
}
