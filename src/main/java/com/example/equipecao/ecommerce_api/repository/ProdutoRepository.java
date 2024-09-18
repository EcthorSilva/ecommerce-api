package com.example.equipecao.ecommerce_api.repository;

import com.example.equipecao.ecommerce_api.model.Categoria;
import com.example.equipecao.ecommerce_api.model.Produto;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Método para encontrar todos os produtos filtrados por categoria com suporte a paginação
    List<Produto> findAllByCategoria(Categoria categoria, Pageable pageable);
    // Método para encontrar todos os produtos filtrados por distribuidor com suporte a paginação
    List<Produto> findAllByDistribuidor(String distribuidor, Pageable pageable);
}