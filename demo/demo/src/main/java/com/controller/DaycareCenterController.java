package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.DaycareCenter;
import com.repository.DaycareCenterRepository;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/daycare-centers")
public class DaycareCenterController {

    @Autowired
    private DaycareCenterRepository daycareCenterRepository;

    @GetMapping
    public List<DaycareCenter> getAllDaycareCenters() {
        return daycareCenterRepository.findAll();
    }

    @PostMapping
    public DaycareCenter addDaycareCenter(@RequestBody DaycareCenter daycareCenter) {
        return daycareCenterRepository.save(daycareCenter);
    }
}
