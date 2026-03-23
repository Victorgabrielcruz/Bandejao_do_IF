package com.bandejao.service;

import com.bandejao.entity.Usuario;
import com.bandejao.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String matricula) throws UsernameNotFoundException {

        Usuario user = repository.findByMatricula(matricula)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return new User(
                user.getMatricula(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}