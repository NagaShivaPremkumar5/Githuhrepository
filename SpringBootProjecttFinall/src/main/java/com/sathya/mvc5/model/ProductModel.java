package com.sathya.mvc5.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ProductModel {
    public String getProName() {
		return proName;
	}
	public void setProName(String proName) {
		this.proName = proName;
	}
	public double getProPrice() {
		return proPrice;
	}
	public void setProPrice(double proPrice) {
		this.proPrice = proPrice;
	}
	public String getProBrand() {
		return proBrand;
	}
	public void setProBrand(String proBrand) {
		this.proBrand = proBrand;
	}
	public String getProDescription() {
		return proDescription;
	}
	public void setProDescription(String proDescription) {
		this.proDescription = proDescription;
	}
	public String getProCategory() {
		return proCategory;
	}
	public void setProCategory(String proCategory) {
		this.proCategory = proCategory;
	}
    private Long id;

    // Product name should not be null or blank and must have between 2 and 100 characters
    @NotBlank(message = "Product name cannot be blank")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String proName;

    // Product price should be positive and not null
    @NotNull(message = "Product price cannot be null")
    @DecimalMin(value = "0.1", inclusive = false, message = "Product price must be greater than 0")
    private double proPrice;

    // Product brand should not be null or blank and must have between 2 and 50 characters
    @NotBlank(message = "Product brand cannot be blank")
    @Size(min = 2, max = 50, message = "Product brand must be between 2 and 50 characters")
    private String proBrand;

    // Product description is optional, but if provided, it should not exceed 500 characters
    @Size(max = 500, message = "Product description cannot exceed 500 characters")
    private String proDescription;

    // Product category should not be null or blank and must be one of the predefined categories
    @NotBlank(message = "Product category cannot be blank")
    @Pattern(regexp = "Mobiles|Laptops|Accessories|Wearables", 
             message = "Product category must be one of the following: Mobiles, Laptops, Accessories, Wearables")
    private String proCategory;
}
