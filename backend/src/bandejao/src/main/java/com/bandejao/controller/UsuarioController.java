package com.bandejao.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bandejao.dto.UsuarioDTO;
import com.bandejao.enums.EStatus;
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

    @PostMapping("/create-users")
    public ResponseEntity<UsuarioDTO.Response> saveServidores(@RequestBody @Valid UsuarioDTO.Create user, @RequestHeader("Authorization") String authHeader) {
        
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            return ResponseEntity.ok(service.save(user));
        } else {
            return ResponseEntity.status(403).build();           
        }
        
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<UsuarioDTO.Response>> getAllUsers(@RequestHeader("Authorization") String authHeader) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            return ResponseEntity.ok(service.getAllUsers());
        } else {
            return ResponseEntity.status(403).build();           
        }
    }

    @PutMapping("/update-users")
    public ResponseEntity<UsuarioDTO.Response> updateUser(@RequestBody @Valid UsuarioDTO.Update user, @RequestHeader("Authorization") String authHeader) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            return ResponseEntity.ok(service.updateUser(user));
        } else {
            return ResponseEntity.status(403).build();           
        }
    }
    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestHeader("Authorization") String authHeader, @RequestBody @Valid UsuarioDTO.UpdatePassword user) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        service.updatepassword(userInfo.matricula(), user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/change-status")
    public ResponseEntity<Void> changeStatus(@RequestHeader("Authorization") String authHeader, @RequestBody List<String> matricula, @RequestParam EStatus status) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN || userInfo.tipo() == EType.ASSISTENTE){
            service.changeStatus(matricula, status);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @DeleteMapping("/delete-users")
    public ResponseEntity<Void> deleteUser(@RequestHeader("Authorization") String authHeader, @RequestBody List<String> matricula) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            service.deleteUser(matricula);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping("/save-multiple")
    public ResponseEntity<Void> saveMultiple(@RequestBody @Valid List<UsuarioDTO.Create> users, @RequestHeader("Authorization") String authHeader) {
        UsuarioDTO.Response userInfo = getMe(authHeader).getBody();
        if(userInfo.tipo() == EType.ADMIN){
            service.saveMultiple(users);
            return ResponseEntity.ok().build();
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