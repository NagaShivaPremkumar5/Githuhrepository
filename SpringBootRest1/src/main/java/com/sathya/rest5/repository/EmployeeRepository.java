package com.sathya.rest5.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sathya.rest5.model.Employee;

import jakarta.transaction.Transactional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	//custom method we created...
	Optional<Employee> findByEmail(String email);
// query is for finding the email
	@Query("SELECT CASE WHEN COUNT(e) > 0 THEN TRUE ELSE FALSE END FROM Employee e WHERE e.email = :email")
boolean existsByEmail(String email);  
    @Transactional
    void deleteByEmail(String email);     
}
