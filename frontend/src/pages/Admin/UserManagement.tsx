import { useState, useEffect } from "react";
import { 
  MdAdd, MdEdit, MdDelete, MdSearch, MdRefresh, 
  MdSettings, MdPerson, MdFileUpload 
} from "react-icons/md";
import { userService } from "../../services/userService";
import type { UsuarioResponse } from "../../types/usuario";
import UserModal from "../../components/UserModal/UserModal";
import StatusModal from "../../components/StatusModal/StatusModal";
import ImportCSVModal from "../../components/ImportCSVModal/ImportCSVModal"; // Certifique-se de criar este arquivo

export default function UserManagement() {
  const [users, setUsers] = useState<UsuarioResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatriculas, setSelectedMatriculas] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // Novo estado
  const [selectedUser, setSelectedUser] = useState<UsuarioResponse | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
      setSelectedMatriculas([]);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleSelectAll = () => {
    if (selectedMatriculas.length === filteredUsers.length) {
      setSelectedMatriculas([]);
    } else {
      setSelectedMatriculas(filteredUsers.map(u => u.matricula!));
    }
  };

  const toggleSelectOne = (matricula: string) => {
    setSelectedMatriculas(prev => 
      prev.includes(matricula) ? prev.filter(m => m !== matricula) : [...prev, matricula]
    );
  };

  const handleDeleteMany = async () => {
    if (window.confirm(`Deseja excluir ${selectedMatriculas.length} usuários?`)) {
      try {
        await userService.deleteUsers(selectedMatriculas);
        loadUsers();
      } catch (error) {
        alert("Erro ao eliminar.");
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.matricula?.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto pb-32 md:pb-8 px-2 md:px-0 space-y-4 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">Usuários</h2>
            <p className="text-[10px] md:text-xs text-gray-400 truncate">Gerencie acessos e permissões</p>
          </div>
          
          <div className="flex gap-1 md:gap-2 shrink-0">
            {/* Botão de Importar CSV */}
            <button 
              onClick={() => setIsImportModalOpen(true)}
              className="p-2 md:px-4 md:py-3 text-green-600 hover:bg-green-50 rounded-xl md:rounded-2xl border border-green-100 transition-all flex items-center gap-2"
              title="Importar CSV"
            >
              <MdFileUpload size={20} />
              <span className="hidden lg:inline text-xs font-bold">Importar</span>
            </button>

            <button 
              onClick={loadUsers} 
              className="p-2 md:p-3 text-gray-400 hover:bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 transition-all"
            >
              <MdRefresh size={20} className={loading ? "animate-spin" : ""} />
            </button>

            <button 
              onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
              className="bg-green-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-all"
            >
              <MdAdd size={20} />
              <span>Novo</span>
            </button>
          </div>
        </div>

        {/* BUSCA */}
        <div className="relative group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Nome ou matrícula..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500/10 focus:border-green-500/30 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* BARRA DE AÇÕES EM MASSA (STICKY MOBILE) */}
      {selectedMatriculas.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-[60] md:relative md:bottom-0 md:left-0 md:right-0 flex items-center justify-between p-3 md:p-4 bg-green-600 md:bg-green-50 text-white md:text-green-800 rounded-2xl border border-green-200/20 md:border-green-100 shadow-2xl md:shadow-none animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs font-bold">{selectedMatriculas.length} selecionados</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsStatusModalOpen(true)}
              className="p-2 bg-white/20 md:bg-white text-white md:text-amber-600 rounded-lg md:rounded-xl font-bold text-xs flex items-center gap-1"
            >
              <MdSettings size={18} /> <span className="hidden sm:inline">Status</span>
            </button>
            <button 
              onClick={handleDeleteMany}
              className="p-2 bg-red-500 md:bg-white text-white md:text-red-600 rounded-lg md:rounded-xl font-bold text-xs flex items-center gap-1"
            >
              <MdDelete size={18} /> <span className="hidden sm:inline">Excluir</span>
            </button>
          </div>
        </div>
      )}

      {/* LISTAGEM */}
      <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
        {loading ? (
          <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-green-600/20 border-t-green-600 rounded-full animate-spin" /></div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">Nenhum usuário encontrado.</div>
        ) : (
          <>
            {/* VIEW: DESKTOP */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <input type="checkbox" checked={selectedMatriculas.length === filteredUsers.length} onChange={toggleSelectAll} className="w-5 h-5 rounded border-gray-300 text-green-600" />
                    </th>
                    <th className="px-6 py-4">Usuário</th>
                    <th className="px-6 py-4 text-center">Tipo</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map((user) => (
                    <tr key={user.matricula} className={`hover:bg-green-50/20 transition-colors ${selectedMatriculas.includes(user.matricula!) ? 'bg-green-50/40' : ''}`}>
                      <td className="px-6 py-4">
                        <input type="checkbox" checked={selectedMatriculas.includes(user.matricula!)} onChange={() => toggleSelectOne(user.matricula!)} className="w-5 h-5 rounded border-gray-300 text-green-600" />
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500 uppercase">{user.name.substring(0,2)}</div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{user.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono">{user.matricula}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-black uppercase tracking-tighter">{user.tipo}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => { setSelectedUser(user); setIsModalOpen(true); }} className="p-2 text-gray-300 hover:text-green-600 transition-colors"><MdEdit size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VIEW: MOBILE */}
            <div className="md:hidden divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <div key={user.matricula} className={`p-4 flex items-center gap-3 active:bg-gray-50 transition-all ${selectedMatriculas.includes(user.matricula!) ? 'bg-green-50/50' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedMatriculas.includes(user.matricula!)} 
                    onChange={() => toggleSelectOne(user.matricula!)} 
                    className="w-5 h-5 rounded-lg border-gray-300 text-green-600 shrink-0" 
                  />
                  <div className="flex-1 min-w-0" onClick={() => toggleSelectOne(user.matricula!)}>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-black uppercase text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{user.tipo}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{user.matricula}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                    className="p-3 bg-gray-50 text-gray-400 rounded-xl"
                  >
                    <MdEdit size={18} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAIS */}
      {isModalOpen && (
        <UserModal 
          userToEdit={selectedUser} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={loadUsers} 
        />
      )}
      
      {isStatusModalOpen && (
        <StatusModal 
          selectedMatriculas={selectedMatriculas} 
          onClose={() => setIsStatusModalOpen(false)} 
          onSuccess={loadUsers} 
        />
      )}

      {isImportModalOpen && (
        <ImportCSVModal 
          onClose={() => setIsImportModalOpen(false)} 
          onSuccess={loadUsers} 
        />
      )}
    </div>
  );
}