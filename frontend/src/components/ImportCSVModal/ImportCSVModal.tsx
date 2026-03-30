import { useState } from "react";
import Papa from "papaparse";
import { MdClose, MdFileUpload, MdCheckCircle, MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { userService } from "../../services/userService";
import type { UsuarioCreate, EType } from "../../types/usuario";

export default function ImportCSVModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string, type: 'error' | 'success' } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFeedback(null);

    Papa.parse(file, {
      header: true, // Usa a primeira linha como chave do objeto
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // Mapeia os dados do CSV para o formato da sua API
          const usersToCreate: UsuarioCreate[] = results.data.map((row: any) => ({
            name: row.nome || row.name,
            email: row.email,
            password: row.senha || row.password || "If@123456", // Senha padrão caso não tenha no CSV
            matricula: String(row.matricula),
            tipo: (row.tipo?.toUpperCase() as EType) || "INTERNO"
          }));

          if (usersToCreate.length === 0) throw new Error("O arquivo está vazio ou mal formatado.");

          await userService.saveMultipleUsers(usersToCreate);
          
          setFeedback({ msg: `${usersToCreate.length} usuários importados!`, type: 'success' });
          setTimeout(() => { onSuccess(); onClose(); }, 2000);
        } catch (err: any) {
          setFeedback({ msg: "Erro ao processar CSV. Verifique as colunas.", type: 'error' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md md:rounded-3xl rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <MdFileUpload className="text-green-600" size={24} /> Importar CSV
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><MdClose size={24}/></button>
        </div>

        {feedback ? (
          <div className={`p-4 rounded-2xl flex items-center gap-3 mb-4 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {feedback.type === 'success' ? <MdCheckCircle size={24}/> : <MdErrorOutline size={24}/>}
            <span className="text-sm font-bold">{feedback.msg}</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 text-blue-700">
              <MdInfoOutline size={24} className="shrink-0" />
              <p className="text-[11px] leading-tight">
                O arquivo deve conter as colunas: <b>nome, email, matricula, tipo</b>. 
                Se a senha não for enviada, o padrão será <i>If@123456</i>.
              </p>
            </div>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-50 hover:border-green-400 transition-all group">
              {loading ? (
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <MdFileUpload size={40} className="text-gray-300 group-hover:text-green-500 mb-2" />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-green-600">Clique para selecionar</span>
                  <span className="text-[10px] text-gray-400 uppercase font-black">Apenas arquivos .csv</span>
                </>
              )}
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={loading} />
            </label>
          </div>
        )}

        <button onClick={onClose} className="w-full mt-4 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">
          Cancelar
        </button>
      </div>
    </div>
  );
}