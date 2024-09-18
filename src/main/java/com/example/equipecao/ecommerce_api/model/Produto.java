package com.example.equipecao.ecommerce_api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="TB_Produto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Enumerated
    private Categoria categoria;

    @NotBlank
    @Size(max = 200)
    private String nome;

    @NotBlank
    private String distribuidor;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    private BigDecimal preco;

    @NotNull
    private boolean temDesconto;

    private BigDecimal precoComDesconto;

    @NotNull
    private byte parcelas;

    @NotBlank
    private String imgUrl;

    @NotNull
    @Min(1)
    @Max(5)
    @Digits(integer = 1, fraction = 1)
    private BigDecimal avaliacao;

    @NotBlank
    @Size(max = 2000)
    private String descricaoDetalhada;

    @NotNull
    private int quantidadeEmEstoque;

    @NotNull
    private boolean ativo;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ImagemProduto> imagens;
}