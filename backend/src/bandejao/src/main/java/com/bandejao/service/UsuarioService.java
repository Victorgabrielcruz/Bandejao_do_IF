package com.bandejao.service;
import java.util.List;

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

    public UsuarioDTO.Response getUser(String matricula) {
        Usuario usuario = repository.findByMatricula(matricula)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return usuario.toResponse();
    }

    public List<UsuarioDTO.Response> getAllUsers() {
        List<Usuario> usuarios = repository.findAll();
        return usuarios.stream()
            .map(Usuario::toResponse)
            .toList();
    }
    
    public void deleteUser(List<String> matricula) {
        for (String m : matricula) {
            Usuario usuario = repository.findByMatricula(m)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            usuario.setStatus(EStatus.INATIVO);
            repository.save(usuario);
        }
    }

    public UsuarioDTO.Response updateUser(UsuarioDTO.Update user) {
        Usuario usuario = repository.findByMatricula(user.matricula())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setName(user.name());
        usuario.setEmail(user.email());
        repository.save(usuario);
        return usuario.toResponse();
    }

    public void changeStatus(List <String> matricula, EStatus status) {
        for (String m : matricula) {
            Usuario usuario = repository.findByMatricula(m)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            usuario.setStatus(status);
            repository.save(usuario);
        }
    }

    public void updatepassword(String matricula, UsuarioDTO.UpdatePassword user) {
        Usuario usuario = repository.findByMatricula(matricula)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setPassword(passwordEncoder.encode(user.password()));
        repository.save(usuario);

    }

    public void saveMultiple(List<UsuarioDTO.Create> users) {
        List<Usuario> usuarios = users.stream()
            .map(user -> {
                Usuario usuario = new Usuario(
                    user.name(),
                    user.email(),
                    passwordEncoder.encode(user.password()),
                    user.matricula(),
                    user.tipo()
                );
                usuario.setStatus(EStatus.ATIVO);
                return usuario;
            })
            .toList();
        repository.saveAll(usuarios);
    }
}