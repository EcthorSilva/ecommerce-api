package com.example.equipecao.ecommerce_api.controller;

import com.example.equipecao.ecommerce_api.model.Usuario;
import com.example.equipecao.ecommerce_api.repository.UsuarioRepository;

import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            // Armazenar informações do usuário na sessão
            HttpSession session = request.getSession();
            session.setAttribute("usuario", usuario);

            // Adicionar logs
            System.out.println("Sessão criada: " + session.getId());
            System.out.println("Usuário armazenado na sessão: " + usuario.getEmail());

            return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Credenciais inválidas\"}");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("{\"message\": \"Logout realizado com sucesso\"}");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            System.out.println("Sessão recuperada: " + session.getId());
    
            // Imprimir todos os atributos da sessão
            Enumeration<String> attributeNames = session.getAttributeNames();
            while (attributeNames.hasMoreElements()) {
                String attributeName = attributeNames.nextElement();
                System.out.println("Atributo da sessão: " + attributeName + " = " + session.getAttribute(attributeName));
            }
    
            // Recuperar o contexto de segurança
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                Object principal = authentication.getPrincipal();
                if (principal instanceof Usuario) {
                    Usuario usuario = (Usuario) principal;
                    System.out.println("Usuário recuperado da sessão: " + usuario.getEmail());
                    return ResponseEntity.ok(usuario);
                } else {
                    System.out.println("Principal não é uma instância de Usuario.");
                }
            } else {
                System.out.println("Autenticação não encontrada ou não autenticada.");
            }
        } else {
            System.out.println("Sessão não encontrada.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Usuário não autenticado\"}");
    }
}