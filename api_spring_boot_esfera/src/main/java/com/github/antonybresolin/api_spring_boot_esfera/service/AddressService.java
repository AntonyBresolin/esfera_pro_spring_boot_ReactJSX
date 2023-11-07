package com.github.antonybresolin.api_spring_boot_esfera.service;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;
    public Address findById(Long id) {
        return addressRepository.findById(id).get();
    }

    public Address create(Address address) {
        return addressRepository.save(address);
    }
    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    public Address update(Address address) {
        return addressRepository.save(address);
    }

    public void deleteById(Long id) {
        addressRepository.deleteById(id);
    }

    public Address findAddressByClientId(Long id) {
        return addressRepository.findAddressByClientId(id);
    }

    @Transactional
    public void deleteByClientId(Long id) {
        addressRepository.deleteByClientId(id);
    }
}
