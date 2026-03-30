import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AuthPage from "../pages/Auth/AuthPage";
import UserManagement from "../pages/Admin/UserManagement";
// import Login from "../pages/Login"; 

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login: SEM Sidebar */}
          <Route path="/" element={<AuthPage />} />

        {/* Todas as rotas dentro deste Route usarão o MainLayout (COM Sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Adicione mais rotas aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;