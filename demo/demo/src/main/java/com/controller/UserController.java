package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.User;
import com.repository.UserRepository;
import com.service.EmailService;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // phone and address are already set from request
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
    
    @GetMapping("/hosts")
    public List<User> getHosts() {
        // If you have a way to filter only hosts, use it. Otherwise, return all users.
        return userRepository.findAll();
    }

    @PutMapping("/update-all-addresses")
    public ResponseEntity<String> updateAllAddresses(@RequestParam String address) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getAddress() == null || user.getAddress().isEmpty()) {
                user.setAddress(address);
                userRepository.save(user);
            }
        }
        return ResponseEntity.ok("All users without an address have been updated.");
    }

    @PostMapping("/mate-request")
    public ResponseEntity<?> sendMateRequest(@RequestParam String toEmail, @RequestBody String details) {
        if (toEmail == null || toEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("Owner email required");
        }
        emailService.sendMateRequestEmail(toEmail, details);
        return ResponseEntity.ok("Mate request email sent");
    }
}
