package com.example.equipecao.ecommerce_api.controller;

import com.example.equipecao.ecommerce_api.model.Categoria;
import com.example.equipecao.ecommerce_api.model.Produto;
import com.example.equipecao.ecommerce_api.repository.ProdutoRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    // Endpoint para buscar todos os produtos com suporte a paginação
    @GetMapping
    public Page<Produto> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    // Endpoint para buscar um produto pelo seu ID
    @GetMapping("/{id}")
    public Optional<Produto> findById(@PathVariable long id) {
        return repository.findById(id);
    }

    // Endpoint para criar um novo produto
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void create(@Valid @RequestBody Produto produto) {
        repository.save(produto);
    }

    // Endpoint para atualizar um produto existente
    @PutMapping("/{id}")
    public void update(@Valid @RequestBody Produto produto, @PathVariable long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado.");
        }
        repository.save(produto);
    }

    // Endpoint para excluir um produto pelo seu ID
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado.");
        }
        repository.deleteById(id);
    }

    // Endpoint para buscar produtos pela categoria com paginação
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<Page<Produto>> findByCategoria(@PathVariable("categoria") String categoriaString,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "100") int size) {
        try {
            Categoria categoria = Categoria.valueOf(categoriaString.toUpperCase());
            Pageable pageable = PageRequest.of(page, size);
            List<Produto> produtosList = repository.findAllByCategoria(categoria, pageable);
            Page<Produto> produtosPage = new PageImpl<>(produtosList, pageable, produtosList.size());
            return ResponseEntity.ok(produtosPage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Endpoint para buscar produtos pelo distribuidor com paginação
    @GetMapping("/distribuidor/{distribuidor}")
    public ResponseEntity<Page<Produto>> findByDistribuidor(@PathVariable String distribuidor,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Produto> produtosList = repository.findAllByDistribuidor(distribuidor, pageable);
        Page<Produto> produtosPage = new PageImpl<>(produtosList, pageable, produtosList.size());
        return ResponseEntity.ok(produtosPage);
    }
}
