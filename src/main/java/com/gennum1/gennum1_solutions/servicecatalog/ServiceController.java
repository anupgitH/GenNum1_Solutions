package com.gennum1.gennum1_solutions.servicecatalog;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {

    private final List<ServiceItem> services = List.of(
            new ServiceItem(
                    "ai-integration",
                    "AI Integration & Automation",
                    "Integrate AI into business workflows and automate repetitive tasks.",
                    "Artificial Intelligence"
            ),
            new ServiceItem(
                    "custom-software",
                    "Custom Software Development",
                    "Build software solutions tailored to business requirements.",
                    "Software Development"
            ),
            new ServiceItem(
                    "web-development",
                    "Website & Full-Stack Development",
                    "Develop responsive websites and full-stack web applications.",
                    "Web Development"
            ),
            new ServiceItem(
                    "api-integration",
                    "API Development & Integration",
                    "Design REST APIs and connect applications and external services.",
                    "Backend Development"
            ),
            new ServiceItem(
                    "cybersecurity",
                    "Cybersecurity & Application Security",
                    "Help identify application security weaknesses and improve protection.",
                    "Cybersecurity"
            ),
            new ServiceItem(
                    "testing",
                    "Software Testing & Bug Fixing",
                    "Find bugs and improve application reliability and quality.",
                    "Quality Assurance"
            )
    );

    @GetMapping
    public List<ServiceItem> getAllServices() {
        return services;
    }

    @GetMapping("/{slug}")
    public Optional<ServiceItem> getServiceBySlug(
            @PathVariable String slug) {

        return services.stream()
                .filter(service -> service.slug().equalsIgnoreCase(slug))
                .findFirst();
    }
}