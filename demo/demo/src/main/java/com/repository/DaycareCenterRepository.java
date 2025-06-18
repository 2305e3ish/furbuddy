package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entity.DaycareCenter;

public interface DaycareCenterRepository extends JpaRepository<DaycareCenter, Long> {
}
