package com.gennum1.gennum1_solutions.lead;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class LeadNotFoundException extends RuntimeException {

    public LeadNotFoundException(String message) {
        super(message);
    }
}