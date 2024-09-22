package com.example.equipecao.ecommerce_api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouteController {

    // rota para pagina de login
    @GetMapping("/login")
    public String login() {
        return "pages/login";
    }
    // rota para a pagina de login backoffice
    @GetMapping("/backoffice-login")
    public String backofficeLogin() {
        return "pages/backoffice-login";
    }
    // rota para a pagina de backoffice
    @GetMapping("/backoffice")
    public String backoffice() {
        return "pages/backoffice";
    }
    // rota para a pagina de perfil 
    @GetMapping("/profile")
    public String profile() {
        return "pages/profile";
    }
    // rota para a pagina de catalogo
    @GetMapping("/catalog")
    public String catalog() {
        return "pages/catalog";
    }
}