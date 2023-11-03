package com.github.antonybresolin.api_spring_boot_esfera.service;

import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.ClientRepository;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.List;

@Service
public class ContactService {
    @Autowired
    ContactRepository contactRepository;

    public Contact findById(Long id) {
        return contactRepository.findById(id).get();
    }

    public Contact create(Contact contact) {
        return contactRepository.save(contact);
    }

    public Contact update(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteById(Long id) {
        contactRepository.deleteById(id);
    }

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public List<Contact> findByClientId(Long id) {
        return contactRepository.findByClientId(id);
    }

}
