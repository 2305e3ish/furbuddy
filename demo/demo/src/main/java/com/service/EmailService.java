package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("OTP for Furbuddy Registration");
        message.setText("Your OTP is: " + otp + "\n\nIt is valid for 5 minutes.");
        mailSender.send(message);
    }

    public void sendSuccessEmail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("Registration Successful");
        message.setText("Hi " + name + ",\n\nYou have successfully registered on Furbuddy.\nEnjoy your experience!\n\nRegards,\nTeam");
        mailSender.send(message);
    }

    public void sendAdoptionRequestEmail(String to, String petName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("Adoption Request for Your Pet");
        message.setText("Your pet '" + petName + "' has been requested for adoption on Furbuddy.");
        mailSender.send(message);
    }

    public void sendDonationConfirmation(String to, String petName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("Pet Donation Confirmation");
        message.setText("Thank you for putting up '" + petName + "' for adoption on Furbuddy.");
        mailSender.send(message);
    }

    public void sendMateRequestEmail(String to, String details) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("Mate Request for Your Pet");
        message.setText(details);
        mailSender.send(message);
    }

    public void sendPetStayRequestEmail(String to, String details) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("celia.198.2000@gmail.com");
        message.setSubject("Pet Stay Request");
        message.setText(details);
        mailSender.send(message);
    }
}
