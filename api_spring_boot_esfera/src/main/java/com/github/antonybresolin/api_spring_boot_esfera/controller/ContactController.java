package com.github.antonybresolin.api_spring_boot_esfera.controller;

import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import com.github.antonybresolin.api_spring_boot_esfera.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @Autowired
    ContactService contactService;

    @PostMapping
    public Contact create(@RequestBody Contact contact) {
        return contactService.create(contact);
    }

    @GetMapping
    public List<Contact> findAll() {
        return contactService.findAll();
    }

    @GetMapping(value = "/{id}")
    public Contact findById(@PathVariable Long id) {
        return contactService.findById(id);
    }

    @PutMapping
    public Contact update(@RequestBody Contact contact) {
        return contactService.update(contact);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable Long id) {
        contactService.deleteById(id);
    }

    @GetMapping(value = "/client/{id}")
    public List<Contact> findByClientId(@PathVariable Long id) {
        return contactService.findByClientId(id);
    }


}
