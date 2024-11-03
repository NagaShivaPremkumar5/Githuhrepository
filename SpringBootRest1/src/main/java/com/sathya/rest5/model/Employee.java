package com.sathya.rest5.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Make sure @Id is on top of @GeneratedValue
    private Long id;

    @NotBlank(message = "Please enter your name")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotNull(message = "Salary is required")
    @Min(value = 5000, message = "Salary must be a positive number")
    private Double salary;

    @NotBlank(message = "Please enter departement name")
    private String department;

    @NotBlank(message = "Please enter your Address")
    @Size(min = 5, max = 100, message = "Address must be between 5 and 100 characters")
    private String address;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    private String email;

}
