import { useState, useEffect } from "react";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "../../styles/components/authForm.css";
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";
import { type EType } from "../../types/usuario";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton} from "@mui/material";
/**
 * Interface para gerenciar as mensagens de feedback (Sucesso/Erro)
 */
interface FeedbackState {
  type: "success" | "error";
  msg: string;
}

const AuthForm = () => {
  // --- ESTADOS ---
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Controla se o usuário tentou enviar (para erros visuais)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setSubmitted(true);
    setFeedback(null);
    const { matricula, password, name, email, confirmPassword, userType } = formData;

    const isFormInvalid = isLogin
      ? !matricula || !password
      : !matricula || !password || !name || !email || !confirmPassword || password !== confirmPassword;

    if (isFormInvalid) {
      setFeedback({ type: "error", msg: "Por favor, preencha todos os campos corretamente." });
      return;
    }
    
    setLoading(true);
    setFeedback(null);
    
    try {
      if (isLogin) {
        await authService.login({matricula, password});
        setFeedback({ type: "success", msg: "Login realizado com sucesso!" });
      }else{
        const type = userType.toUpperCase() as EType; // Extrai o tipo do vínculo
        console.log({type})
        await userService.create({name, email, password, matricula, tipo: type});
        setFeedback({ type: "success", msg: "Conta criada com sucesso! Faça login para continuar." });
        setTimeout(() => {
        setIsLogin(true);
        setSubmitted(false);
      }, 2500);
      }
  } catch (error: any) {
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;
      let errorMsg = "Ocorreu um erro. Tente novamente.";
      if (status === 409) {
        errorMsg = backendMessage || "Já existe um cadastro com esses dados.";
      } else if (backendMessage) {
        errorMsg = backendMessage;
      }
      setFeedback({ type: "error", msg: errorMsg });
    } finally {
      setLoading(false);
    }
  }


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
        
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? "text" : "password"} // Alterna o tipo
            placeholder="*Senha"
            value={formData.password}
            onChange={handleChange}
            className={`${getInputClass(formData.password)} pr-10`} // pr-10 para o ícone não cobrir o texto
            required
          />
          <div className="absolute right-2 text-gray-400">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              size="small"
              sx={{ color: 'inherit' }}
            >
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </div>
        </div>

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
            <div className="relative flex items-center">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="*Confirmar Senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${getInputClass(formData.confirmPassword)} pr-10`}
                required={!isLogin}
              />
              <div className="absolute right-2 text-gray-400">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: 'inherit' }}
                >
                  {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </div>
            </div>
            
            {/* SELETOR DE TIPO (RADIO) */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Tipo de Vínculo</label>
              <div className="flex gap-2">
                {['Interno', 'Externo', 'Superior'].map((type) => (
                  <label key={type} className="flex-1">
                    <input
                      type="radio"
                      name="userType"
                      value={`${type}`}
                      className="hidden peer"
                      checked={formData.userType === `${type}`}
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