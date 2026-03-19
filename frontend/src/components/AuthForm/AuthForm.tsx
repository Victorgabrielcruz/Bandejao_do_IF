import { useState, useEffect } from "react";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "../../styles/components/authForm.css";

/**
 * Interface para gerenciar as mensagens de feedback (Sucesso/Erro)
 */
interface FeedbackState {
  type: "success" | "error";
  msg: string;
}

const AuthForm = () => {
  // --- ESTADOS ---
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Controla se o usuário tentou enviar (para erros visuais)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
    userType: "Aluno-Externo"
  });

  // --- EFEITOS ---
  // Faz o alerta desaparecer automaticamente após 5 segundos
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setSubmitted(true); // Isso vai aplicar as bordas vermelhas via CSS

    // Validação manual simples para exibir o Alerta de erro
    const { matricula, password, name, email, confirmPassword } = formData;
    const isFormInvalid = isLogin 
      ? !matricula || !password 
      : !matricula || !password || !name || !email || !confirmPassword;

    if (isFormInvalid) {
      setFeedback({ type: "error", msg: "Por favor, preencha todos os campos obrigatórios." });
      return; // Interrompe a execução aqui
    }
    setLoading(true);
    setSubmitted(true); // Ativa o estilo de "erro" nos campos vazios
    setFeedback(null);

    // Validação de Senha (apenas no Cadastro)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setFeedback({ type: "error", msg: "As senhas não coincidem!" });
      setLoading(false);
      return;
    }

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
      
      const data = await response.json();

      if (response.ok) {
        setFeedback({ 
          type: "success", 
          msg: isLogin ? "Login bem-sucedido! Redirecionando..." : "Conta criada com sucesso!" 
        });

        if (isLogin) {
          // Pequeno delay para o usuário ver o feedback de sucesso antes de sair
          setTimeout(() => window.location.href = "/", 1500);
        } else {
          // Se for registro, aguarda e muda para a tela de login
          setTimeout(() => {
            setIsLogin(true);
            setSubmitted(false);
            setFeedback(null);
          }, 2500);
        }
      } else {
        setFeedback({ type: "error", msg: data.message || "Dados inválidos ou erro no servidor." });
      }
    } catch (error) {
      setFeedback({ type: "error", msg: "Erro de conexão. Tente novamente mais tarde." });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função para definir a classe CSS do input dinamicamente.
   * Se o formulário foi enviado e o campo está vazio, aplica 'input-error'.
   */
  const getInputClass = (value: string) => {
    return `auth-input-custom ${submitted && !value ? "input-error" : ""}`;
  };

  return (
    <div className="w-full max-w-[340px] flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Logo IF" className="w-16 h-16 object-contain" />
        <h1 className="header-title-custom">
          BANDEJÃO <br /> DO IF
        </h1>
      </div>

      {/* ÁREA DE ALERTA (MUI) */}
      <Collapse in={!!feedback} sx={{ mb: 2 }}>
        {feedback && (
          <Alert severity={feedback.type} onClose={() => setFeedback(null)}>
            <AlertTitle>{feedback.type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
            {feedback.msg}
          </Alert>
        )}
      </Collapse>

      <h2 className="text-sm text-gray-500 mb-6 font-medium">
        {isLogin ? "Bem vindo de volta!" : "Crie sua conta institucional"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        {/* CAMPOS COMUNS */}
        <input
          name="matricula"
          type="text"
          placeholder="*Matrícula"
          value={formData.matricula}
          onChange={handleChange}
          className={getInputClass(formData.matricula)}
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="*Senha"
          value={formData.password}
          onChange={handleChange}
          className={getInputClass(formData.password)}
          required
        />

        {/* CAMPOS DE REGISTRO */}
        <div className={`register-fields-container ${!isLogin ? 'show' : ''}`}>
          <div className="flex flex-col gap-3 pt-3 pb-2">
            <input
              name="name"
              type="text"
              placeholder="*Nome completo"
              value={formData.name}
              onChange={handleChange}
              className={getInputClass(formData.name)}
              required={!isLogin}
            />
            <input
              name="email"
              type="email"
              placeholder="*Email Institucional"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass(formData.email)}
              required={!isLogin}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="*Confirmar Senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={getInputClass(formData.confirmPassword)}
              required={!isLogin}
            />
            
            {/* SELETOR DE TIPO (RADIO) */}
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

        {isLogin && (
          <div className="flex items-center gap-2 text-xs text-gray-500 ml-1 py-1">
            <input type="checkbox" id="remember" className="cursor-pointer" />
            <label htmlFor="remember" className="cursor-pointer">Lembrar de mim</label>
          </div>
        )}

        <button type="submit" className="btn-auth-animated mt-2" disabled={loading}>
          {loading ? "Carregando..." : (isLogin ? "Entrar" : "Criar Conta")}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        {isLogin ? "Ainda não tem acesso?" : "Já possui cadastro?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setSubmitted(false); // Limpa as bordas vermelhas ao trocar de tela
            setFeedback(null);   // Limpa mensagens
          }}
          className="text-green-700 font-bold cursor-pointer hover:underline transition-all"
        >
          {isLogin ? "Cadastre-se" : "Faça Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;