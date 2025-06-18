package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.entity.DaycareCenter;
import com.repository.DaycareCenterRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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
