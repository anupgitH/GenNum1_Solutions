package com.gennum1.gennum1_solutions.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LeadRequest(

        @NotBlank
        @Size(max = 100)
        String name,

        @NotBlank
        @Email
        @Size(max = 254)
        String email,

        @Size(max = 20)
        String phone,

        @NotBlank
        @Size(max = 200)
        String service,

        @NotBlank
        @Size(max = 5000)
        String message

) {
}