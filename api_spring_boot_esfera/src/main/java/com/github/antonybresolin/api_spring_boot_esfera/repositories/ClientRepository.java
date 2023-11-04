package com.github.antonybresolin.api_spring_boot_esfera.repositories;

import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByStatus(String status);
}
