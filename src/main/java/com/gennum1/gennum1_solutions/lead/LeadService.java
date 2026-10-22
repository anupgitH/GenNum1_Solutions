package com.gennum1.gennum1_solutions.lead;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Transactional
    public Lead createLead(LeadRequest request) {
        Lead lead = new Lead(
                request.name().trim(),
                request.email().trim(),
                request.phone() == null || request.phone().isBlank()
                        ? null : request.phone().trim(),
                request.service().trim(),
                request.message().trim()
        );

        return leadRepository.save(lead);
    }

    @Transactional(readOnly = true)
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Lead getLeadById(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() ->
                        new LeadNotFoundException("Lead not found: " + id));
    }

    @Transactional
    public Lead updateLeadStatus(Long id, String status) {
        Lead lead = getLeadById(id);
        lead.setStatus(status);
        return leadRepository.save(lead);
    }
}