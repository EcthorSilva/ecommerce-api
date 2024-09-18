package com.example.equipecao.ecommerce_api.controller;

import com.example.equipecao.ecommerce_api.model.Usuario;
import com.example.equipecao.ecommerce_api.repository.UsuarioRepository;
import com.example.equipecao.ecommerce_api.util.CPFValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Usuario>> listAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody Usuario usuario) {
        if (!isValidEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail inválido.");
        }
        // Validar Email cadastrado
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado.");
        }

        // Validar CPF
        if (!CPFValidator.isValidCPF(usuario.getCpf())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF inválido.");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setAtivo(true);
        usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable long id, @Valid @RequestBody Usuario usuario) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        usuario.setId(id);
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Usuário atualizado com sucesso.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok("Usuário deletado com sucesso.");
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable long id, @RequestParam boolean ativo) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        Usuario usuario = usuarioOptional.get();
        usuario.setAtivo(ativo);
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Status do usuário atualizado com sucesso.");
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        Pattern pat = Pattern.compile(emailRegex);
        return pat.matcher(email).matches();
    }
}