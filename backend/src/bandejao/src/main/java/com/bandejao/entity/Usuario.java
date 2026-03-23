package com.bandejao.entity;
import com.bandejao.dto.UsuarioDTO;
import com.bandejao.enums.EStatus;
import com.bandejao.enums.EType;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // Boa prática: definir o nome da tabela no plural
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String matricula;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EType tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EStatus status;

    // 1. Construtor padrão exigido pelo JPA
    public Usuario() {}

    // 2. Construtor completo para uso no seu Service/DTO
    public Usuario(String name, String email, String password, String matricula, EType tipo) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.matricula = matricula;
        this.tipo = tipo;
        this.status = EStatus.ATIVO; // Default ao criar
    }

    // Getters e Setters (ou use @Getter @Setter do Lombok)
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    // ... repita para os outros campos

    public void setStatus(EStatus status) {
        this.status = status;
    }

    public String getPassword() {
        return password;
    }

    public UsuarioDTO.Response toResponse() {
        return new UsuarioDTO.Response(
            this.name,
            this.email,
            this.matricula,
            this.tipo
        );
    }

    public String getMatricula() {
        return matricula;
    }
}