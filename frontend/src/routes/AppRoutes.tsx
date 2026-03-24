import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AuthPage from "../pages/Auth/AuthPage";

export default function AppRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>    
        </BrowserRouter>
    )
}