package com.bandejao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bandejao.entity.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByMatricula(String matricula);
    Optional<Usuario> findByName(String name);
}
