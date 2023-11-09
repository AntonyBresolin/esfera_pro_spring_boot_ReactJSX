package com.github.antonybresolin.api_spring_boot_esfera.service;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.ClientRepository;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
    private ContactRepository contactRepository;


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

    public List<Client> findByStatusActive() {
        return clientRepository.findByStatus("Active");
    }

    public List<Client> findByStatusInactive() {
        return clientRepository.findByStatus("Inactive");
    }

    public Client updateClientStatusActive(Long id) {
        Client client = clientRepository.findById(id).get();
        client.setStatus("Active");
        return clientRepository.save(client);
    }

    public Client updateClientStatusInactive(Long id) {
        Client client = clientRepository.findById(id).get();
        client.setStatus("Inactive");
        return clientRepository.save(client);
    }

   public List<Contact> findContactsByClientId(Long clientId) {
        return contactRepository.findByClientId(clientId);
    }

    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }


}
