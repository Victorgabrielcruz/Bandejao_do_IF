package com.bandejao.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bandejao.dto.UsuarioDTO;
import com.bandejao.enums.EType;
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

    @PostMapping("/create-servidores")
    public ResponseEntity<UsuarioDTO.Response> saveServidores(@RequestBody @Valid UsuarioDTO.Create user, @RequestHeader("Authorization") String authHeader) {
        
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            return ResponseEntity.ok(service.save(user));
        } else {
            return ResponseEntity.status(403).build();           
        }
        
    }

    private ResponseEntity<UsuarioDTO.Response> getMe(String authHeader) {
        String tokenString = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            tokenString = authHeader.substring(7); // remove "Bearer "
        }
        String matricula = authService.getMatriculaFromToken(tokenString);
        UsuarioDTO.Response userInfo = service.getUser(matricula);
        return ResponseEntity.ok(userInfo);
    }
}