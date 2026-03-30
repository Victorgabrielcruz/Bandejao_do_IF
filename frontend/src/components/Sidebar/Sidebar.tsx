import {
  MdOutlineDashboard,
  MdGroup,
  MdQueue,
  MdRestaurantMenu,
  MdBarChart,
  MdMenu,
  MdChevronLeft,
  MdClose,
} from "react-icons/md";
import logo from "../../assets/images/logo.png";

const Sidebar = ({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => {
  const menuItems = [
    { label: "Dashboard", icon: MdOutlineDashboard, to: "/", active: true },
    { label: "Usuários", icon: MdGroup, to: "/usuarios" },
    { label: "Filas", icon: MdQueue, to: "/filas" },
    { label: "Cardápio", icon: MdRestaurantMenu, to: "/cardapio" },
    { label: "Relatórios", icon: MdBarChart, to: "/relatorios" },
  ];

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full bg-white z-50 shadow-2xl md:shadow-sm border-r border-gray-100
          transition-all duration-300 ease-in-out flex flex-col
          
          /* No mobile é sempre larga (w-64). No desktop varia conforme isCollapsed */
          w-64 ${isCollapsed ? "md:w-25" : "md:w-70"}
          
          /* Controle de visibilidade mobile */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-50">
          
          {/* Logo e Nome: Esconde APENAS no desktop colapsado */}
          <div className={`flex items-center gap-3 transition-opacity duration-200 
            ${isCollapsed ? "md:opacity-0 md:invisible md:w-0" : "opacity-100"}`}>
            <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
            <span className="font-bold text-gray-800 leading-tight text-sm">
              BANDEJÃO <br /> <span className="text-green-600">DO IF</span>
            </span>
          </div>

          {/* Botão Fechar (Apenas Mobile) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500"
          >
            <MdClose size={24} />
          </button>

          {/* Botão Colapsar (Apenas Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden md:flex p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-all 
              ${isCollapsed ? "mx-auto" : ""}`}
          >
            {isCollapsed ? <MdMenu size={24} /> : <MdChevronLeft size={24} />}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.to}
              onClick={() => setIsOpen(false)} // Fecha ao clicar no mobile
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl
                text-sm font-semibold transition-all group
                ${
                  item.active
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
                /* No desktop colapsado, centraliza o ícone */
                ${isCollapsed ? "md:justify-center md:px-0" : ""}
              `}
            >
              <item.icon className={`text-2xl min-w-[24px] ${item.active ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`} />
              
              {/* Texto: Sempre visível no mobile, colapsa no desktop */}
              <span className={`truncate ${isCollapsed ? "md:hidden" : "block"}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* FOOTER DA SIDEBAR (Versão) */}
        <div className="p-4 border-t border-gray-50 text-center">
           <p className={`text-[10px] text-gray-400 font-bold uppercase ${isCollapsed ? "md:hidden" : "block"}`}>
            v1.0.0
           </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;