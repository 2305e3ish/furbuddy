package com.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "vet_hospital")
public class VetHospital {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(nullable = false)
private String name;
@Column(nullable = false)
private String address;
private String phone;
private String website;
@Column(name = "google_map_link", nullable = false, length = 500)
private String googleMapLink;
// Getters and Setters
public int getId() {
return id;
}
public void setId(int id) {
this.id = id;
}
public String getName() {
return name;
}
public void setName(String name) {
this.name = name;
}
public String getAddress() {
return address;
}
public void setAddress(String address) {
this.address = address;
}
public String getPhone() {
return phone;
}
public void setPhone(String phone) {
this.phone = phone;
}
public String getWebsite() {
return website;
}
public void setWebsite(String website) {
this.website = website;
}
public String getGoogleMapLink() {
return googleMapLink;
}
public void setGoogleMapLink(String googleMapLink) {
this.googleMapLink = googleMapLink;
}
}
