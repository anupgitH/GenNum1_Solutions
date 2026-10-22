package com.gennum1.gennum1_solutions.contact;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public Contact createContact(ContactRequest request) {

        Contact contact = new Contact(
                request.name().trim(),
                request.email().trim(),
                request.subject().trim(),
                request.message().trim()
        );

        return contactRepository.save(contact);
    }
}