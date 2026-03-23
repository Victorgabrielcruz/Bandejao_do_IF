package com.bandejao.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bandejao.dto.UsuarioDTO;
import com.bandejao.service.AuthService;
import com.bandejao.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @Autowired
    private AuthService authService;
    
    @PostMapping("/create-aluno")
    public ResponseEntity<UsuarioDTO.Response> save(@RequestBody @Valid UsuarioDTO.Create user) {
        return ResponseEntity.ok(service.save(user));
    }

    @GetMapping("/me")
    public ResponseEntity<String> getMe(@RequestHeader("Authorization") String authHeader) {
        String tokenString = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            tokenString = authHeader.substring(7); // remove "Bearer "
        }
        String matricula = authService.getMatriculaFromToken(tokenString);
        return ResponseEntity.ok(matricula);
    }
    
}