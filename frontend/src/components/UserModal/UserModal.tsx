import { useState, useEffect } from "react";
import { 
  MdClose, MdSave, MdPerson, 
  MdErrorOutline, MdCheckCircleOutline, MdLockOutline 
} from "react-icons/md";
import { userService } from "../../services/userService";
import type { UsuarioResponse, UsuarioCreate, EType } from "../../types/usuario";

interface ModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userToEdit: UsuarioResponse | null;
}

export default function UserModal({ onClose, onSuccess, userToEdit }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  // Estado inicial do formulário
  const [formData, setFormData] = useState<UsuarioCreate>({
    name: "",
    email: "",
    password: "",
    matricula: "",
    tipo: "INTERNO",
  });

  // Preenche os dados se for Edição
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        password: "", // Senha não vem no GET e não é editada aqui
        matricula: userToEdit.matricula || "",
        tipo: userToEdit.tipo,
      });
    }
  }, [userToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      if (userToEdit) {
        // MODO EDIÇÃO: Envia apenas name, email e matricula (conforme UsuarioUpdate)
        await userService.updateUser({
          name: formData.name,
          email: formData.email,
          matricula: formData.matricula!,
        });
        setFeedback({ message: "Usuário atualizado com sucesso!", type: 'success' });
      } else {
        // MODO CRIAÇÃO: Envia todos os campos
        await userService.createUser(formData);
        setFeedback({ message: "Usuário cadastrado com sucesso!", type: 'success' });
      }

      // Feedback visual antes de fechar
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao processar solicitação.";
      setFeedback({ message: msg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/40 backdrop-blur-sm">
      {/* Backdrop para fechar ao clicar fora */}
      <div className="absolute inset-0" onClick={onClose} />

      <form 
        onSubmit={handleSubmit} 
        className="relative bg-white w-full max-w-md md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 md:zoom-in duration-300"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-green-600 text-white rounded-xl shadow-lg shadow-green-200">
              <MdPerson size={20}/>
            </div>
            {userToEdit ? "Editar Perfil" : "Novo Cadastro"}
          </h3>
          <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <MdClose size={24}/>
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* AVISOS ESTILO LOGIN */}
          {feedback && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-bounce-subtle ${
              feedback.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {feedback.type === 'error' ? <MdErrorOutline size={20}/> : <MdCheckCircleOutline size={20}/>}
              <span className="text-sm font-bold">{feedback.message}</span>
            </div>
          )}

          {/* CAMPO NOME (Sempre visível) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nome Completo</label>
            <input 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 focus:bg-white transition-all text-sm" 
              placeholder="Ex: João Silva"
            />
          </div>

          {/* CAMPO EMAIL (Sempre visível) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">E-mail Institucional</label>
            <input 
              required 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 focus:bg-white transition-all text-sm" 
              placeholder="email@if.edu.br"
            />
          </div>

          {/* CAMPOS CONDICIONAIS (Apenas na Criação) */}
          {!userToEdit && (
            <div className="space-y-5 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Matrícula</label>
                  <input 
                    required 
                    value={formData.matricula} 
                    onChange={e => setFormData({...formData, matricula: e.target.value})} 
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 text-sm font-mono" 
                    placeholder="000000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tipo</label>
                  <select 
                    value={formData.tipo} 
                    onChange={e => setFormData({...formData, tipo: e.target.value as EType})} 
                    className="w-full px-4 py-4 md:py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 text-sm appearance-none cursor-pointer"
                  >
                    <option value="INTERNO">INTERNO</option>
                    <option value="EXTERNO">EXTERNO</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="PROFESSOR">PROFESSOR</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Senha de Acesso</label>
                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                  <input 
                    required 
                    type="password"
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    className="w-full pl-11 pr-4 py-4 md:py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-green-500 text-sm" 
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          )}

          {/* AVISO DE EDIÇÃO (Se estiver editando) */}
          {userToEdit && (
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
              <p className="text-[10px] text-blue-600 font-bold uppercase leading-tight">
                Nota: Matrícula e Senha não podem ser alteradas por este formulário.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER / AÇÕES */}
        <div className="p-6 border-t bg-gray-50/30 flex flex-col md:flex-row gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="order-2 md:order-1 flex-1 py-4 md:py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="order-1 md:order-2 flex-1 bg-green-600 hover:bg-green-700 text-white py-4 md:py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><MdSave size={20}/> {userToEdit ? "Salvar Edição" : "Criar Usuário"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}