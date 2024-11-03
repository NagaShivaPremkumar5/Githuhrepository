package com.sathya.mvc5.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sathya.mvc5.entity.ProductEntity;
import com.sathya.mvc5.model.ProductModel;
import com.sathya.mvc5.service.ProductService;

import jakarta.validation.Valid;


@Controller
public class ProductController 
{

    // Use camel case for fields
    @Autowired
    private ProductService productService;

    // Display the form
    @GetMapping("/productform")
    public String getProductForm(Model model) {
        // Giving an empty object to the view
        ProductModel productModel = new ProductModel();
        model.addAttribute("productModel", productModel);
        model.addAttribute("page", "productform");
        return "index";  // Thymeleaf template name
    }

    // Handle form submission
    @PostMapping("/saveProduct")
    public String saveProduct(ProductModel productModel) {
        productService.saveProductData(productModel);
        return "success";  // Redirect to a success page or another action
    }

    // Get all products
    @GetMapping("/getproducts")
    public String getProducts(Model model) {
        List<ProductEntity> products = productService.getAllProducts();
        model.addAttribute("products", products);
        model.addAttribute("page", "getproducts");
        return "index";  // Thymeleaf template name
    }


        // Handle product deletion via GET request
        @GetMapping("/delete")
        public String deleteProduct(@RequestParam("id") Long productId) {
            // Call the service to delete the product by its ID
            productService.deleteProductById(productId);
            // Redirect back to the product list after deletion
            return "redirect:/getproducts";
        }
        @GetMapping("/edit/{id}")                                                                   
        public String editProductForm(@PathVariable Long id, Model model) {                         
            Optional<ProductEntity> product = Optional.of(productService.findProductById(id));                   
                                                                                                    
            if (product.isPresent()) {                                                              
                model.addAttribute("productModel", product.get());                                  
                return "edit-product"; // View for editing product                                  
            } else {                                                                                
                model.addAttribute("errorMessage", "Product not found");                            
                return "error"; // Redirect to an error page if not found                           
            }                                                                                       
        } 
        
        
        
        @PostMapping("/edit/{id}")
        public String updateProduct(@PathVariable Long id, @ModelAttribute("productModel") ProductModel productModel) {
            productService.updateProduct(id, productModel); // Call service to update product
            return "redirect:/getproducts"; 
        }
        @GetMapping("/Aboutus")
        public String aboutUs() {
        return "aboutus";
         
        }
        
        @GetMapping("/ContactUs")
        public String contactUs() {
        return "contactus";
}
        @GetMapping("/searchProductById")
        public String searchProductById(@RequestParam("id") long id, Model model) {
            ProductEntity product = productService.getProductById(id);
            model.addAttribute("product", product);
            model.addAttribute("page", "searchProductById");
            return "search-product";

}

        @GetMapping("/")
        public String getHomePage(Model model) {
        	model.addAttribute("page", "/");
        	return "index";
        }
       
        @PostMapping("/saveproduct")
        public String saveProduct(@Valid ProductModel productModel, BindingResult bindingResult, Model model) {
            
            // Check if there are validation errors
            if (bindingResult.hasErrors()) {
                // If validation fails, return the user to the form with error messages
                return "add-product"; // The name of the form view where validation errors will be shown
            }

            // If validation passes, save the product and redirect to a success page or another route
            // For example, you could save the product to the database using a service layer

            // Add a success message as a flash attribute (shown once after redirection)
            productService.saveProductData(productModel);

            return "success"; // Redirect to the products listing or another success page
          }
        
      
    }
        
        

 