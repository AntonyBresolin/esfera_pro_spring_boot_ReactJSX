package com.github.antonybresolin.api_spring_boot_esfera.model;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;

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

}
