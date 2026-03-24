import {NavLink} from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/usuarios">Usuários</NavLink>
        <NavLink to="/admin/filas">Filas</NavLink>
        <NavLink to="/admin/cardapio">Cardápio</NavLink>
        <NavLink to="/admin/relatorios">Relatórios</NavLink>
      </nav>
    </div>
  );
}