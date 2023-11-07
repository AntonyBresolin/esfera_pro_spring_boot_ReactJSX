package com.github.antonybresolin.api_spring_boot_esfera.controller;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import com.github.antonybresolin.api_spring_boot_esfera.model.ClientWithContactsAndAddress;
import com.github.antonybresolin.api_spring_boot_esfera.service.AddressService;
import com.github.antonybresolin.api_spring_boot_esfera.service.ClientService;
import com.github.antonybresolin.api_spring_boot_esfera.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/client-with-contacts-and-address")
public class ClientWithContactsAndAddressController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private ContactService contactService;
    @Autowired
    private AddressService addressService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClientWithContactsAndAddressById(@PathVariable Long id) {
        try {
            Client client = clientService.findById(id);
            if (client == null) {
                return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
            }

            List<Contact> contacts = contactService.findContactsByClientId(id);
            Address address = addressService.findByClientId(id);

            if (address == null) {
                return new ResponseEntity<>("Address not found", HttpStatus.NOT_FOUND);
            }

            ClientWithContactsAndAddress clientWithContactsAndAddress = new ClientWithContactsAndAddress(client, address, contacts);
            return new ResponseEntity<>(clientWithContactsAndAddress, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details here to debug
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

