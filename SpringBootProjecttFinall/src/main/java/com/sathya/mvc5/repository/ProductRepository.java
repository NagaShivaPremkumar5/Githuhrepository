package com.sathya.mvc5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sathya.mvc5.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>{

}
