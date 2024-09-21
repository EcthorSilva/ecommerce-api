package com.example.equipecao.ecommerce_api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouteController {

    @GetMapping("/login")
    public String login() {
        return "pages/login";
    }

    @GetMapping("/backoffice-login")
    public String backofficeLogin() {
        return "pages/backoffice-login";
    }

    @GetMapping("/backoffice")
    public String backoffice() {
        return "pages/backoffice";
    }

    @GetMapping("/catalog")
    public String catalog() {
        return "pages/catalog";
    }
}