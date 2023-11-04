package com.github.antonybresolin.api_spring_boot_esfera.controller;

import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import com.github.antonybresolin.api_spring_boot_esfera.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    ClientService clientService;

    @GetMapping(value = "/{id}")
    public Client findById(@PathVariable(value = "id")Long id) {
        return clientService.findById(id);
    }

    @PostMapping
    public Client create(@RequestBody Client client) {
        return clientService.create(client);
    }

    @PutMapping
    public Client update(@RequestBody Client client) {
        return clientService.update(client);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable(value = "id")Long id) {
        clientService.deleteById(id);
    }

    @GetMapping
    public List<Client> findAll() {
        return clientService.findAll();
    }

    @GetMapping(value = "/status/active")
    public List<Client> findByClientStatusActive() {
        return clientService.findByStatusActive();
    }

    @GetMapping(value = "/status/inactive")
    public List<Client> findByClientStatusInactive() {
        return clientService.findByStatusInactive();
    }

    @PutMapping(value = "/{id}/status/active")
    public Client updateClientStatusActive(@PathVariable(value = "id")Long id) {
        return clientService.updateClientStatusActive(id);
    }

    @PutMapping(value = "/{id}/status/inactive")
    public Client updateClientStatusInactive(@PathVariable(value = "id")Long id) {
        return clientService.updateClientStatusInactive(id);
    }
}
