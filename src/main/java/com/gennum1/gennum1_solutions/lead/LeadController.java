package com.gennum1.gennum1_solutions.lead;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    // Public endpoint: submit an enquiry
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lead createLead(@Valid @RequestBody LeadRequest request) {
        return leadService.createLead(request);
    }

    // Admin only
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    // Admin only
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Lead getLeadById(@PathVariable Long id) {
        return leadService.getLeadById(id);
    }

    // Admin only
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public Lead updateLeadStatus(
            @PathVariable Long id,
            @RequestParam
            @NotBlank
            @Pattern(regexp = "NEW|CONTACTED|IN_PROGRESS|CLOSED")
            String status
    ) {
        return leadService.updateLeadStatus(id, status);
    }
}