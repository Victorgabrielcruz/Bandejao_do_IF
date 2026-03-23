package com.bandejao.service;
import com.bandejao.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService{
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    public String login(String matricula, String password) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(matricula, password)
            );
        
            return jwtUtil.generateToken(matricula);
        
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Matrícula ou senha inválidas");
        }
    }

    public String getMatriculaFromToken(String token) {
        return jwtUtil.extractUsername(token);
    }
}