package com.sathya.rest5.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sathya.rest5.exceptions.EmployeeNotFoundException;
import com.sathya.rest5.model.Employee;
import com.sathya.rest5.service.EmployeeService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@EnableCaching
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
    //This is for list returning in browser
    @GetMapping("/getnames")
    public List<String> getNames() {
        return employeeService.getNames(); 
    }

    //  This will Save  single employee
    @PostMapping("/saveemployee")
    public ResponseEntity<Employee> saveEmployee(@Valid @RequestBody Employee employee) {
        Employee savedEmp = employeeService.saveEmployee(employee);  // Call the service method
        
        return ResponseEntity.status(HttpStatus.CREATED)
                             .header("employee-status", "employee saved successfully")
                             .body(savedEmp);
    }

    //  This is for Saving  list of employees
    @PostMapping("/saveall")
    public ResponseEntity<List<Employee>> saveAllEmployees(@RequestBody List<Employee> employees) {
        List<Employee> savedEmps = employeeService.saveAllEmployees(employees);  // Call the service method
        
        return ResponseEntity.status(HttpStatus.CREATED)
                             .header("success", "all employees are saved")
                             .body(savedEmps);
    }
    // This will get all emplopyees...
    @GetMapping("/getall")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> emps = employeeService.getAllEmployees();
    	
    	return ResponseEntity.status(HttpStatus.OK)
    			             .header("status", "data reading successfulyy")
    			             .body(emps);
    }
    // This will get employee by Id
    @GetMapping("/getbyid/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id)
	{	Optional<Employee> optionalEmp = employeeService.getById(id);
		if(optionalEmp.isPresent())
		{	
			Employee employee = optionalEmp.get();
			 // Create an EntityModel for the user
	        EntityModel<Employee> entityModel = EntityModel.of(employee);

	        // Add self link
	        entityModel.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(EmployeeController.class).getById(id)).withSelfRel());

	        // Add link to update the user
	        entityModel.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(EmployeeController.class).updateById(id, employee)).withRel("update"));

	        // Add link to delete the user
	        entityModel.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(EmployeeController.class).deleteEmployeeById(id)).withRel("delete"));

	        // Add link to get all users
	        entityModel.add(WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(EmployeeController.class).getAllEmployees()).withRel("all-users"));
			
			return ResponseEntity.status(HttpStatus.OK)
								 .body(entityModel);
		
	
    			}
    			else
    			{
    				//return ResponseEntity.status(HttpStatus.NOT_FOUND)
    					//               .body("data is not found with this "+id);
    		     throw new EmployeeNotFoundException("Employee not found with this id"+""+ id);
    			}
    				
    
    }
    // This will get employee by email..
    @GetMapping("/getbyemail/{email}")
    public ResponseEntity<?> getByEmail(@PathVariable String email) {
        Optional<Employee> optionalEmp = employeeService.getByEmail(email);

        if (optionalEmp.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                                 .body(optionalEmp.get());
        } else {
            //return ResponseEntity.status(HttpStatus.NOT_FOUND)
              //                   .body("Employee not found with email: " + email);
		     throw new EmployeeNotFoundException("Employee not found with this email"+""+ email);

        }
    }
    // this is used to delete employee by Id
    @DeleteMapping("/deletebyid/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable Long id) {
        boolean status = employeeService.deleteById(id);
        
        if (status) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT) 
            		.body("Employee deleted successfully."); 
        } else {
           // return ResponseEntity.status(HttpStatus.NOT_FOUND)
             //                    .body("Employee not found with ID: " + id); 
		     throw new EmployeeNotFoundException("Employee not found with this id"+""+ id);

        }
    }
    // This is used to delete employee by Email
    @DeleteMapping("/deletebyemail/{email}")
    public ResponseEntity<String> deleteByEmail(@PathVariable String email) {
        boolean status = employeeService.deleteByEmail(email);
        
        if (status) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT) 
                                 .body("Employee deleted successfully."); 
        } else {
           // return ResponseEntity.status(HttpStatus.NOT_FOUND)
             //                    .body("Employee not found with email: " + email);
		     throw new EmployeeNotFoundException("Employee not found with this email -"+""+ email);

        }
    }
    // It will delete all employees
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllEmployees() {
        boolean status = employeeService.deleteAllEmployees();

        if (status) {
            return ResponseEntity.noContent().build();  // Returns 204 No Content on success
        } else {
              //  return ResponseEntity.status(HttpStatus.NOT_FOUND)
                //    .header("Error", "Error occurred while deleting employees")
                  //  .body("Failed to delete all employees.");
		     throw new EmployeeNotFoundException("No employees found-"+""+ status);

        }
    }
    // This annotation will update the employee based on Id
    @PutMapping("/updatebyid/{id}")
    public ResponseEntity<?> updateById(@PathVariable Long id, @RequestBody Employee newEmployee) {
        Optional<Employee> updatedEmployee = employeeService.updateById(id, newEmployee);
        
        if (updatedEmployee.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
            		             .header("status","data updated successfully")
            		             .body((updatedEmployee.get())); 
        } else {
           // return ResponseEntity.status(HttpStatus.NOT_FOUND)
             //                    .body("Employee with this id is not found " + id );
		     throw new EmployeeNotFoundException("Employee not found with this id to update-"+""+ id);

        }
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployeePartialData(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Optional<Employee> updatedEmployee = employeeService.updatePartialData(id, updates);

        if (updatedEmployee.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
            		             .header("status", "data updated successfully")
            		             .body(updatedEmployee.get());
        } else {
           // return ResponseEntity.notFound().build();
		     throw new EmployeeNotFoundException("Employee not found with this id to update-"+""+ id);

        }
 }
}

    
    
    
  

