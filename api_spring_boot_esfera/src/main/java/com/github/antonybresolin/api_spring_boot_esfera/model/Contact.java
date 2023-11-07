package com.github.antonybresolin.api_spring_boot_esfera.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contact")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private int type;

    @Column (name = "contentContact", nullable = false)
    private String contentContact;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Client client;

    public Contact() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getContentContact() {
        return contentContact;
    }

    public void setContentContact(String contentContact) {
        this.contentContact = contentContact;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }


}
