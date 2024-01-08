package com.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
