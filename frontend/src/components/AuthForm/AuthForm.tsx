import { useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/components/authForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  // Estado único para todos os campos
  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
    userType: "Aluno-Externo"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { matricula: formData.matricula, password: formData.password }
      : { ...formData };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json()

      if(response.ok){
          console.log("Sucesso:", data);
          if(isLogin){
              // Redirecionar para a dashboard ou página principal
              window.location.href = "/";
          } else {
            alert("Sucesso");  
            setIsLogin(true);
          }
      } else{
        alert(`Erro: ${data.message || 'Algo deu errado'}`);
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Erro na autenticação. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[340px] flex flex-col">
      
      {/* CABEÇALHO (Logo + Texto Alinhado) */}
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Logo IF" className="w-16 h-16 object-contain" />
        <h1 className="header-title-custom">
          BANDEJÃO <br /> DO IF
        </h1>
      </div>

      {/* SUBTÍTULO ANIMADO */}
      <h2 className="text-sm text-gray-500 mb-6 font-medium transition-opacity duration-300">
        {isLogin ? "Bem vindo de volta!" : "Crie sua conta institucional"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        {/* CAMPOS COMUNS (Sempre visíveis) */}
        <input
          name="matricula"
          type="text"
          placeholder="*Matrícula"
          value={formData.matricula}
          onChange={handleChange}
          className="auth-input-custom"
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="*Senha"
          value={formData.password}
          onChange={handleChange}
          className="auth-input-custom"
          required
        />

        {/* CAMPOS EXCLUSIVOS DO REGISTRO (Animados) */}
        <div className={`register-fields-container ${!isLogin ? 'show' : ''}`}>
          <div className="flex flex-col gap-3 pt-3 pb-2">
            <input
              name="name"
              type="text"
              placeholder="*Nome completo"
              value={formData.name}
              onChange={handleChange}
              className="auth-input-custom"
              required={!isLogin}
            />
            <input
              name="email"
              type="email"
              placeholder="*Email Institucional"
              value={formData.email}
              onChange={handleChange}
              className="auth-input-custom"
              required={!isLogin}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="*Confirmar Senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input-custom"
              required={!isLogin}
            />
            <div className="flex flex-col gap-2 mt-2">
      <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Tipo de Vínculo</label>
      <div className="flex gap-2">
        {['Interno', 'Externo', 'Superior'].map((type) => (
          <label key={type} className="flex-1">
            <input
              type="radio"
              name="userType"
              value={`Aluno-${type}`}
              className="hidden peer"
              required={!isLogin}
              checked={formData.userType === `Aluno-${type}`}
              onChange={handleChange}
            />
            <div className="text-center p-2 rounded-lg border-2 border-gray-100 text-xs font-semibold text-gray-500 cursor-pointer transition-all peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-700">
              {type}
            </div>
          </label>
        ))}
      </div>
    </div>
          </div>
        </div>

        {/* CHECKBOX (Só no Login) */}
        {isLogin && (
          <div className="flex items-center gap-2 text-xs text-gray-500 ml-1 py-1">
            <input type="checkbox" id="remember" className="cursor-pointer" />
            <label htmlFor="remember" className="cursor-pointer">Lembrar de mim</label>
          </div>
        )}

        {/* BOTÃO COM EFEITO SLIDE */}
        <button type="submit" className="btn-auth-animated mt-2" disabled={loading}>
          {isLogin ? "Entrar" : "Criar Conta"}
        </button>
      </form>

      {/* BOTÃO DE TROCA (Login/Registro) */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        {isLogin ? "Ainda não tem acesso?" : "Já possui cadastro?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-700 font-bold cursor-pointer hover:underline transition-all"
        >
          {isLogin ? "Cadastre-se" : "Faça Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;