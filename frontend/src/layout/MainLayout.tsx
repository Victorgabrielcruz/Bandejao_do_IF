import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function MainLayout(){
    return(
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </div>
        </div>
    )
}