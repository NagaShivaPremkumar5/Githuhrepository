package com.sathya.mvc5.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sathya.mvc5.entity.ProductEntity;
import com.sathya.mvc5.model.ProductModel;
import com.sathya.mvc5.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Save product data to the database
    public void saveProductData(ProductModel productModel) {
        double price = productModel.getProPrice();
        String category = productModel.getProCategory();
        double discountPrice = calculateDiscount(price, category);

        ProductEntity productEntity = new ProductEntity();
        productEntity.setProName(productModel.getProName());
        productEntity.setProPrice(productModel.getProPrice());
        productEntity.setProImage("/images/product1.jpg");  // Static image path
        productEntity.setProCategory(productModel.getProCategory());
        productEntity.setProDescription(productModel.getProDescription());
        productEntity.setProBrand(productModel.getProBrand());
        productEntity.setDiscPrice(discountPrice);
        productEntity.setCreatedAt(LocalDateTime.now());
        productEntity.setCreatedBy("Prem Kumar");  // System user

        productRepository.save(productEntity);
    }

    // Helper method to calculate discount based on the product category
    private double calculateDiscount(double price, String category) {
        switch (category.toLowerCase()) {
            case "mobiles":
                return price * 0.1;  // 10% discount
            case "laptops":
                return price * 0.15;  // 15% discount
            case "accessories":
                return price * 0.2;  // 20% discount
            case "wearables":
                return price * 0.25;  // 25% discount
            default:
                return 0.0;  // No discount for other categories
        }
    }

    // Get all products from the database
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    // Find product by ID (returns ProductEntity)
    public ProductEntity findProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Delete product by ID
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    // Find product by ID (returns Optional<ProductModel>)
    public Optional<ProductModel> findProductByIdModel(Long id) {
        return productRepository.findById(id).map(this::convertEntityToModel);
    }

    // Update product by ID
    public void updateProduct(Long id, ProductModel productModel) {
        Optional<ProductEntity> existingProduct = productRepository.findById(id);

        if (existingProduct.isPresent()) {
            ProductEntity productEntity = existingProduct.get();
            productEntity.setProName(productModel.getProName());
            productEntity.setProPrice(productModel.getProPrice());
            productEntity.setProBrand(productModel.getProBrand());
            productEntity.setProDescription(productModel.getProDescription());
            productEntity.setProCategory(productModel.getProCategory());

            productRepository.save(productEntity);  // Save updated product
        }
    }

    // Convert ProductEntity to ProductModel
    private ProductModel convertEntityToModel(ProductEntity productEntity) {
        ProductModel productModel = new ProductModel();
        productModel.setProName(productEntity.getProName());
        productModel.setProPrice(productEntity.getProPrice());
        productModel.setProBrand(productEntity.getProBrand());
        productModel.setProDescription(productEntity.getProDescription());
        productModel.setProCategory(productEntity.getProCategory());
        return productModel;
    }

    // Search product by ID (returns Optional<ProductModel>)
    public Optional<ProductModel> searchProductById(Long id) {
        return productRepository.findById(id).map(this::convertEntityToModel);
    }

    public ProductEntity getProductById(long id) {
        return productRepository.findById(id).orElse(null);
    }
}
