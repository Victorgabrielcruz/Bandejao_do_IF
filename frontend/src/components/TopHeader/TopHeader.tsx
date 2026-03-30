import { MdMenu, MdClose } from "react-icons/md";
import logo from "../../assets/images/logo.png";

const TopHeader = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <header className="
      md:hidden 
      sticky top-0 z-30 
      w-full h-20 
      bg-white/80 backdrop-blur-md 
      border-b border-gray-100 
      flex items-center justify-between 
      px-5
    ">
      {/* LADO ESQUERDO: LOGO E NOME */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-green-50 rounded-lg">
          <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 leading-none text-sm tracking-tight">
            BANDEJÃO <span className="text-green-600 uppercase">IF</span>
          </span>
          <span className="text-[10px] text-gray-500 font-medium leading-none mt-1">
            Gestão de Refeitório
          </span>
        </div>
      </div>

      {/* LADO DIREITO: BOTÃO MENU */}
      <button
        onClick={toggleSidebar}
        className={`
          p-2 rounded-xl transition-all duration-200
          ${isOpen 
            ? "bg-red-50 text-red-600 rotate-90" 
            : "bg-gray-50 text-gray-700 active:scale-90"
          }
        `}
        aria-label="Abrir menu"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>
    </header>
  );
};

export default TopHeader;