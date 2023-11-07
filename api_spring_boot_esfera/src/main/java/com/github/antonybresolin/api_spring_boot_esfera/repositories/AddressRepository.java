package com.github.antonybresolin.api_spring_boot_esfera.repositories;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findAddressByClientId(Long clientId);
}
