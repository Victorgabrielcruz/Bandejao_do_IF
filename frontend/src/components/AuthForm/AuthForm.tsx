// Hooks do React para estado e efeitos
import { useState, useEffect } from "react";

// Componentes do Material UI para alertas e animações
import { Alert, AlertTitle, Collapse } from "@mui/material";

// Imagem de logo
import logo from "../../assets/images/logo.png";

// Estilos do formulário
import "../../styles/components/authForm.css";

// Serviços de autenticação e usuário (API)
import { authService } from "../../services/authService";
import { userService } from "../../services/userService";

// Tipo de enum para tipo de usuário
import { type EType } from "../../types/usuario";

// Ícones de visibilidade de senha
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

/**
 * Interface para o estado de feedback (mensagens de sucesso/erro)
 */
interface FeedbackState {
  type: "success" | "error";
  msg: string;
}

const AuthForm = () => {
  // ================= ESTADOS =================

  // Controla se a senha está visível
  const [showPassword, setShowPassword] = useState(false);

  // Controla se está em modo login ou cadastro
  const [isLogin, setIsLogin] = useState(true);

  // Controla estado de carregamento (loading)
  const [loading, setLoading] = useState(false);

  // Controla se o usuário já tentou enviar o formulário (validação visual)
  const [submitted, setSubmitted] = useState(false);

  // Mensagens de feedback (erro/sucesso)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // Controla visibilidade da confirmação de senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dados do formulário
  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
    userType: "Aluno-Externo"
  });

  // ================= EFFECT =================

  /**
   * Remove automaticamente a mensagem de feedback após 5 segundos
   */
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // ================= HANDLERS =================

  /**
   * Atualiza os valores do formulário dinamicamente
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Submissão do formulário (login ou cadastro)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página

    setSubmitted(true); // ativa validações visuais
    setFeedback(null);   // limpa feedback anterior

    const { matricula, password, name, email, confirmPassword, userType } = formData;

    // Validação do formulário
    const isFormInvalid = isLogin
      ? !matricula || !password
      : !matricula || !password || !name || !email || !confirmPassword || password !== confirmPassword;

    if (isFormInvalid) {
      setFeedback({ type: "error", msg: "Por favor, preencha todos os campos corretamente." });
      return;
    }

    setLoading(true); // inicia loading

    try {
      if (isLogin) {
        // ================= LOGIN =================
        await authService.login({ matricula, password });

        setFeedback({ type: "success", msg: "Login realizado com sucesso!" });
        setTimeout(() => {
          window.location.href = "/admin"; // Redireciona para dashboard após login
        }, 1500);
      } else {
        // ================= CADASTRO =================

        // Converte o tipo de usuário para enum
        const type = userType.toUpperCase() as EType;

        console.log({ type });

        // Cria usuário via API
        await userService.create({
          name,
          email,
          password,
          matricula,
          tipo: type
        });

        setFeedback({
          type: "success",
          msg: "Conta criada com sucesso! Faça login para continuar."
        });

        // Após cadastro, volta para tela de login
        setTimeout(() => {
          setIsLogin(true);
          setSubmitted(false);
        }, 2500);
      }

    } catch (error: any) {
      // ================= TRATAMENTO DE ERRO =================

      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;

      let errorMsg = "Ocorreu um erro. Tente novamente.";

      // Tratamento específico de erro 409 (conflito - duplicidade)
      if (status === 409) {
        errorMsg = backendMessage || "Já existe um cadastro com esses dados.";

      } else if (backendMessage) {
        // Caso backend envie mensagem personalizada
        errorMsg = backendMessage;
      }

      setFeedback({ type: "error", msg: errorMsg });

    } finally {
      // Finaliza loading independente de sucesso ou erro
      setLoading(false);
    }
  };

  /**
   * Retorna classe CSS do input com validação visual
   */
  const getInputClass = (value: string) => {
    return `auth-input-custom ${submitted && !value ? "input-error" : ""}`;
  };

  return (
    <div className="w-full max-w-[340px] flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Logo IF" className="w-16 h-16 object-contain" />
        <h1 className="header-title-custom">
          BANDEJÃO <br /> DO IF
        </h1>
      </div>

      {/* ================= ALERTA ================= */}
      <Collapse in={!!feedback} sx={{ mb: 2 }}>
        {feedback && (
          <Alert severity={feedback.type} onClose={() => setFeedback(null)}>
            <AlertTitle>
              {feedback.type === "success" ? "Sucesso" : "Erro"}
            </AlertTitle>
            {feedback.msg}
          </Alert>
        )}
      </Collapse>

      {/* Texto dinâmico */}
      <h2 className="text-sm text-gray-500 mb-6 font-medium">
        {isLogin ? "Bem vindo de volta!" : "Crie sua conta institucional"}
      </h2>

      {/* ================= FORMULÁRIO ================= */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>

        {/* MATRÍCULA */}
        <input
          name="matricula"
          type="text"
          placeholder="*Matrícula"
          value={formData.matricula}
          onChange={handleChange}
          className={getInputClass(formData.matricula)}
          required
        />

        {/* SENHA */}
        <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="*Senha"
            value={formData.password}
            onChange={handleChange}
            className={`${getInputClass(formData.password)} pr-10`}
            required
          />

          {/* Botão para mostrar/ocultar senha */}
          <div className="absolute right-2 text-gray-400">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        {/* ================= CAMPOS DE CADASTRO ================= */}
        <div className={`register-fields-container ${!isLogin ? 'show' : ''}`}>
          <div className="flex flex-col gap-3 pt-3 pb-2">

            {/* NOME */}
            <input
              name="name"
              type="text"
              placeholder="*Nome completo"
              value={formData.name}
              onChange={handleChange}
              className={getInputClass(formData.name)}
              required={!isLogin}
            />

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="*Email Institucional"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass(formData.email)}
              required={!isLogin}
            />

            {/* CONFIRMAR SENHA */}
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

              {/* Botão visibilidade confirmação senha */}
              <div className="absolute right-2 text-gray-400">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>

            {/* ================= TIPO DE USUÁRIO ================= */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">
                Tipo de Vínculo
              </label>

              <div className="flex gap-2">
                {['Interno', 'Externo', 'Superior'].map((type) => (
                  <label key={type} className="flex-1">
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      className="hidden peer"
                      checked={formData.userType === type}
                      onChange={handleChange}
                    />

                    {/* Estilização do botão selecionado */}
                    <div className="text-center p-2 rounded-lg border-2 border-gray-100 text-xs font-semibold text-gray-500 cursor-pointer transition-all peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-700">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTÃO SUBMIT */}
        <button type="submit" disabled={loading} className="btn-auth-animated ">
          {loading ? "Carregando..." : (isLogin ? "Entrar" : "Criar Conta")}
        </button>
      </form>

      {/* ================= TOGGLE LOGIN/CADASTRO ================= */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        {isLogin ? "Ainda não tem acesso?" : "Já possui cadastro?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setSubmitted(false);
            setFeedback(null);
          }}
          className="text-green-700 font-bold cursor-pointer hover:underline"
        >
          {isLogin ? "Cadastre-se" : "Faça Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;