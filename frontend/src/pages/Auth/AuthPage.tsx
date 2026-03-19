import AuthForm from "../../components/AuthForm/AuthForm";
import bandejaoImage from "../../assets/images/imagem-bandejao.png";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* 1. Removido h-[550px] e adicionado h-auto para crescer com o form.
          2. Adicionado max-w-[1000px] para não ficar gigante em telas UltraWide.
          3. Adicionado flex-col para mobile (imagem some ou vai pra baixo).
      */}
      <div className="w-full max-w-[950px] h-auto min-h-[550px] bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden transition-all duration-500">
        
        {/* LADO DO FORMULÁRIO: h-full para alinhar com a imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
            <AuthForm />
        </div>

        {/* LADO DA IMAGEM: Esconde em telas muito pequenas (hidden md:flex) */}
        <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center relative">
          <img
            src={bandejaoImage}
            alt="Ilustração Bandejão"
            className="w-full h-full object-cover"
          />
          {/* Overlay opcional para dar um estilo mais "IF" na imagem */}
          <div className="absolute inset-0 bg-green-900/5 mix-blend-multiply"></div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;