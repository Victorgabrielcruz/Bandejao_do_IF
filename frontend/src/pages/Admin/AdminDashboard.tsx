import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import StatusFila from "../../components/Temporarios/StatusFila";
import Vendas from "../../components/Temporarios/Vendas";
import ControleGrupos from "../../components/Temporarios/ControleGrupos";
import Cardapio from "../../components/Cardapio/Cardapio";

const AdminDashboard = () => {
    return(
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6 bg-gray-50 grid grid-cols-2 gap-4">
            <StatusFila />
            <Vendas />
            <ControleGrupos />
            <Cardapio />
          </div>
        </div>
    )
}

export default AdminDashboard;