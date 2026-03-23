package com.bandejao.dto;

public class LoginRequest {
    private String matricula;
    private String password;

    public String getMatricula() { return matricula; }
    public String getPassword() { return password; }

    public void setMatricula(String matricula) { this.matricula = matricula; }
    public void setPassword(String password) { this.password = password; }
}