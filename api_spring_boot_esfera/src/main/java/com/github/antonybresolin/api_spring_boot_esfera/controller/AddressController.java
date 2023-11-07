package com.github.antonybresolin.api_spring_boot_esfera.controller;

import com.github.antonybresolin.api_spring_boot_esfera.model.Address;
import com.github.antonybresolin.api_spring_boot_esfera.repositories.AddressRepository;
import com.github.antonybresolin.api_spring_boot_esfera.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    AddressService addressService;
    @GetMapping(value = "/{id}")
    public Address findById(@PathVariable(value = "id")Long id) {
        return addressService.findById(id);
    }

    @PostMapping
    public Address create(@RequestBody Address address) {
        return addressService.create(address);
    }

    @GetMapping
    public List<Address> findAll() {
        return addressService.findAll();
    }

    @PutMapping
    public Address update(@RequestBody Address address) {
        return addressService.update(address);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteById(@PathVariable(value = "id")Long id) {
        addressService.deleteById(id);
    }

    @GetMapping(value = "/client/{id}")
    public Address findByClientId(@PathVariable Long id) {
        return addressService.findByClientId(id);
    }
}
