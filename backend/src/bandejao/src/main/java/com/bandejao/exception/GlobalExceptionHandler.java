package com.bandejao.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleConflict(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        
        // Verifica se o erro é de matrícula duplicada (UK do Postgres)
        if (ex.getMessage().contains("ukactt97vp4uwf55js4s2b7xgm9") || ex.getMessage().contains("matricula")) {
            errors.put("message", "A matrícula informada já possui cadastro.");
        } else {
            errors.put("message", "Erro de integridade de dados.");
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
    }   
}