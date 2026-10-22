package com.gennum1.gennum1_solutions.lead;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 254)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false, length = 200)
    private String service;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, length = 20)
    private String status = "NEW";

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    protected Lead() {
    }

    public Lead(String name, String email, String phone,
                String service, String message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.service = service;
        this.message = message;
        this.status = "NEW";
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getService() {
        return service;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}