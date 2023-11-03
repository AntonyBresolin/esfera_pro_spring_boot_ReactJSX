package com.github.antonybresolin.api_spring_boot_esfera.repositories;

import com.github.antonybresolin.api_spring_boot_esfera.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByClientId(Long clientId);
}
