package com.bandejao.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bandejao.dto.UsuarioDTO;
import com.bandejao.entity.Usuario;
import com.bandejao.enums.EStatus;
import com.bandejao.repository.UsuarioRepository;

@Service
public class UsuarioService{

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioDTO.Response save(UsuarioDTO.Create user) {
        Usuario usuario = new Usuario(
            user.name(),
            user.email(),
            passwordEncoder.encode(user.password()),
            user.matricula(),
            user.tipo()
        );
        usuario.setStatus(EStatus.ATIVO);
        repository.save(usuario);
        Usuario salvo = repository.save(usuario);
        return salvo.toResponse();
    }
    
}