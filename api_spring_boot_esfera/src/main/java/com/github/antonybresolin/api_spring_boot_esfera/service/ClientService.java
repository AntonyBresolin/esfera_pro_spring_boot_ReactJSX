package com.github.antonybresolin.api_spring_boot_esfera.service;

import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public Client findById(Long id) {
        return clientRepository.findById(id).get();
    }

    public Client create(Client client) {
        return clientRepository.save(client);
    }

    public Client update(Client client) {
        return clientRepository.save(client);
    }

    public void deleteById(Long id) {
        clientRepository.deleteById(id);
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }
}
