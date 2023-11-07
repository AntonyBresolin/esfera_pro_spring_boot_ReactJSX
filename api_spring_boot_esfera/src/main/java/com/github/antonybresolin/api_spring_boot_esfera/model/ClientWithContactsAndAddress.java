package com.github.antonybresolin.api_spring_boot_esfera.model;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.List;

public class ClientWithContactsAndAddress {
    private Client client;
    private Address address;
    private List<Contact> contacts;

    public ClientWithContactsAndAddress(Client client, Address address, List<Contact> contacts) {
        this.client = client;
        this.address = address;
        this.contacts = contacts;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }
}
