import { Outlet } from "react-router";
import Navbar from "./ui/NavBar";

export function App() {
    const token = localStorage.getItem('token') ? true : false
    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <div className="pb-7">
                <Navbar token={token}/>    
            </div>
            
            <Outlet/>
        </div>
    )
}

