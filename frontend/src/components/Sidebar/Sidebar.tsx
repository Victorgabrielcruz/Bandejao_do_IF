import { MdOutlineDashboard, MdGroup, MdQueue, MdRestaurantMenu, MdBarChart } from "react-icons/md";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const menuItems = [
    { label: "Dashboard", icon: MdOutlineDashboard, to: "/", active: true },
    { label: "Usuários", icon: MdGroup, to: "/usuarios" },
    { label: "Filas", icon: MdQueue, to: "/filas" },
    { label: "Cardápio", icon: MdRestaurantMenu, to: "/cardapio" },
    { label: "Relatórios", icon: MdBarChart, to: "/relatorios" },
  ];
  return (
    <>
      {/* OVERLAY (escurece fundo) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

      <div className="flex flex-col items-center mb-12">
        <img src={logo} alt="Logo" className="w-16 h-16 mb-4" />
        <h1 className="header-title-custom">
          BANDEJÃO <br /> DO IF
        </h1>            
        <p className="text-xs text-gray-500 font-medium">Sistema de Gestão - v1.0.0</p>

      </div>

      

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.to}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-colors 
              ${item.active 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <item.icon className="size-6" />
            {item.label}
          </a>
        ))}
      </nav>
      </aside>
    </>
  );
};

export default Sidebar;