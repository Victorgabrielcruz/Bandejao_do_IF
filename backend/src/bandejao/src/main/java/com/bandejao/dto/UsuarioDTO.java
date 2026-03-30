package com.bandejao.dto;

import com.bandejao.enums.EType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public class UsuarioDTO {

    public record Create(
        @NotBlank(message = "O nome é obrigatório")
        String name,

        @Email(message = "E-mail inválido")
        @NotBlank(message = "O e-mail é obrigatório")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
        String password,

        String matricula,

        @NotNull(message = "O tipo de usuário é obrigatório")
        EType tipo
        
    ) {}

    public record Response(
        String name,
        String email,
        String matricula,
        EType tipo
    ) {}

    public record Update(
        @NotBlank(message = "O nome é obrigatório")
        String name,

        @NotBlank(message = "A matrícula é obrigatória")
        String matricula,

        @Email(message = "E-mail inválido")
        @NotBlank(message = "O e-mail é obrigatório")
        String email
    ) {}

    public record UpdatePassword(
        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
        String password
    ) {}
}