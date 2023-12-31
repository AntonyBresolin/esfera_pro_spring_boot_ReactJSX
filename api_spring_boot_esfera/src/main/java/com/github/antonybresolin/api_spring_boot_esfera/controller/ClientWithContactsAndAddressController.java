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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
            if (contacts == null) {
                return new ResponseEntity<>("Contacts not found", HttpStatus.NOT_FOUND);
            }

            Address address = addressService.findAddressByClientId(id);

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

    @Transactional
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteAdressAndContactsByClientId(@PathVariable Long id) {
        try {
            addressService.deleteByClientId(id);
            contactService.deleteContactsByClientId(id);
            clientService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details here to debug
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/status/active")
    public ResponseEntity<?> findActivesClientsWithContactsAndAddress() {
        try {
            List<Client> clients = clientService.findByStatusActive();
            return getResponseEntity(clients);
        } catch (Exception e) {
            // Log the exception details here to debug
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @GetMapping(value = "/status/inactive")
    public ResponseEntity<?> findInactivesClientsWithContactsAndAddress() {
        try {
            List<Client> clients = clientService.findByStatusInactive();
            return getResponseEntity(clients);
        } catch (Exception e) {
            // Log the exception details here to debug
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ResponseEntity<?> getResponseEntity(List<Client> clients) {

        List<ClientWithContactsAndAddress> clientsWithContactsAndAddress = new ArrayList<>();

        if (clients == null) {
            return new ResponseEntity<>("Clients not found", HttpStatus.NOT_FOUND);
        }

        if (clients.isEmpty()) {
            return new ResponseEntity<>("Clients not found", HttpStatus.NOT_FOUND);
        }

        for (int i = 0; i < clients.size(); i++){

            List<Contact> contacts = contactService.findContactsByClientId(clients.get(i).getId());
            if (contacts == null) {
                return new ResponseEntity<>("Contacts not found", HttpStatus.NOT_FOUND);
            }

            Address address = addressService.findAddressByClientId(clients.get(i).getId());

            if (address == null) {
                return new ResponseEntity<>("Address not found", HttpStatus.NOT_FOUND);

            }
            ClientWithContactsAndAddress clientWithContactsAndAddress = new ClientWithContactsAndAddress(clients.get(i), address, contacts);
            clientsWithContactsAndAddress.add(clientWithContactsAndAddress);
        }
        return new ResponseEntity<>(clientsWithContactsAndAddress, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateClientWithContactsAndAddressByIdClient(@PathVariable Long id, @RequestBody ClientWithContactsAndAddress clientWithContactsAndAddress) {
        try {
            Client client = clientService.findById(id);
            if (client == null) {
                return new ResponseEntity<>("Client not found", HttpStatus.NOT_FOUND);
            }

            List<Contact> contacts = contactService.findContactsByClientId(id);
            if (contacts == null) {
                return new ResponseEntity<>("Contacts not found", HttpStatus.NOT_FOUND);
            }

            Address address = addressService.findAddressByClientId(id);

            if (address == null) {
                return new ResponseEntity<>("Address not found", HttpStatus.NOT_FOUND);
            }

            clientService.updateClient(clientWithContactsAndAddress.getClient());
            addressService.updateAddress(clientWithContactsAndAddress.getAddress());
            contactService.updateContacts(clientWithContactsAndAddress.getContacts());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception details here to debug
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

