package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.entity.Instance;

public interface InstanceRepository extends JpaRepository<Instance, Long> {

}
