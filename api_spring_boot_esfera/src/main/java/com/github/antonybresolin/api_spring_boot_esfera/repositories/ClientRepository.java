package com.github.antonybresolin.api_spring_boot_esfera.repositories;

import com.github.antonybresolin.api_spring_boot_esfera.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
