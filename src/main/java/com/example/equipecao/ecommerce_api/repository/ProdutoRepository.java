package com.example.equipecao.ecommerce_api.repository;

import com.example.equipecao.ecommerce_api.model.Categoria;
import com.example.equipecao.ecommerce_api.model.Produto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // buscar por categoria
    List<Produto> findAllByCategoria(Categoria categoria, Pageable pageable);
    // buscar por distribuidor
    List<Produto> findAllByDistribuidor(String distribuidor, Pageable pageable);
    // buscar por nome
    List<Produto> findByNomeContainingIgnoreCase(String nome);
}