package com.sathya.rest5.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.sathya.rest5.model.Employee;
import com.sathya.rest5.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private static List<Employee> getAllEmployees;
	@Autowired
    private EmployeeRepository employeeRepository;
	 @Cacheable("employeeNames")
	public List<String> getNames() {
		System.out.println("successfully fetched");
        return List.of("Ratansir","Sathya","unknown","Prabhas","PawanKalyan");
	}

    // Save a single employee
    public Employee saveEmployee(Employee employee) {
        employee = employeeRepository.save(employee);
       return employee;
    }

    // Save a list of employees
    public List<Employee> saveAllEmployees(List<Employee> employees) {
        employees = employeeRepository.saveAll(employees);
        return employees; 

	}

    // This will Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // It will find employee by Id
    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);  
    }
     // this will get employee By Email
    public Optional<Employee> getByEmail(String email) {
        return employeeRepository.findByEmail(email);
        }    
    // This will delete employee by Id
    public boolean deleteById(Long id) {
    	
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
        }
        
        return false;
    }
    // This will delete employee by email
    public boolean deleteByEmail(String email) {
        
        if (employeeRepository.existsByEmail(email)) {  
        	employeeRepository.deleteByEmail(email);     
            return true;                                 
        }
        
        return false;                                    
    }
    // This will delete all employees
    public boolean deleteAllEmployees() {
        long count = employeeRepository.count(); // Get the count of employees

        if (count > 0) {
            employeeRepository.deleteAll(); // Delete all employees if they exist
            return true; // Deletion was successful, return true
        } else {
            return false; // No employees to delete, return false
        }
    }
        //This will update existing data with new data
    public Optional<Employee> updateById(Long id, Employee newEmployee) {
    	Optional<Employee>optionalEmployee = employeeRepository.findById(id);
    	if(optionalEmployee.isPresent()) {
    		Employee existingEmployee = optionalEmployee.get();
    		
            existingEmployee.setName(newEmployee.getName());
            existingEmployee.setEmail(newEmployee.getEmail());
            existingEmployee.setDepartment(newEmployee.getDepartment());
            existingEmployee.setSalary(newEmployee.getSalary());

            // Saving the updated employee
            Employee updatedEmployee = employeeRepository.save(existingEmployee);
            return Optional.of(updatedEmployee);
        }
    	else 
    		return Optional.empty();
    	}


    public Optional<Employee> updatePartialData(Long id, Map<String, Object> updates) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();

            updates.forEach((key, value) -> {
                switch (key) {
                    case "name":
                        existingEmployee.setName((String) value);
                        break;
                    case "email":
                        existingEmployee.setEmail((String) value);
                        break;
                    case "department":
                        existingEmployee.setDepartment((String) value);
                        break;
                    case "salary":
                        existingEmployee.setSalary((Double) value);
                        break;
                    // You may add more cases depending on the fields of Employee
                }
            });

            Employee updatedEmployee = employeeRepository.save(existingEmployee);
            return Optional.of(updatedEmployee);
        }
        return Optional.empty();
    }

	public static List<Employee> getGetAllEmployees() {
		return getAllEmployees;
	}

	public static void setGetAllEmployees(List<Employee> getAllEmployees) {
		EmployeeService.getAllEmployees = getAllEmployees;
	}
    }

    
    
    
    
    
    
    
    
    
    
    
    