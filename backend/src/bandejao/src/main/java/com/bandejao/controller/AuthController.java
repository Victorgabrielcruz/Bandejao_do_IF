package com.bandejao.controller;

import com.bandejao.dto.LoginRequest;
import com.bandejao.dto.LoginResponse;
import com.bandejao.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getMatricula(), request.getPassword());
        return new LoginResponse(token);
    }
}