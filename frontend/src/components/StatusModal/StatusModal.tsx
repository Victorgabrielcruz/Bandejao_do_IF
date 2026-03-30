import { useState } from "react";
import { userService} from "../../services/userService";
import type { EStatus } from "../../types/usuario";
import { MdCheckCircle, MdClose } from "react-icons/md";

export default function StatusModal({ selectedMatriculas, onClose, onSuccess }: any) {
  const [status, setStatus] = useState<EStatus>("ATIVO");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await userService.changeStatus(selectedMatriculas, status);
      onSuccess();
      onClose();
    } catch (error) { alert("Erro ao atualizar status."); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Alterar Status ({selectedMatriculas.length})</h3>
          <button onClick={onClose} className="text-gray-400"><MdClose size={24}/></button>
        </div>

        <div className="space-y-2">
          {["ATIVO", "INATIVO", "SUSPENSO"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s as EStatus)}
              className={`w-full p-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                status === s ? "border-green-500 bg-green-50 text-green-700" : "border-gray-50 bg-gray-50 text-gray-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button 
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 flex items-center justify-center gap-2"
        >
          {loading ? "Processando..." : <><MdCheckCircle size={20}/> Aplicar a todos</>}
        </button>
      </div>
    </div>
  );
}