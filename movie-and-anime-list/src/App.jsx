import { Outlet, useNavigate } from "react-router";
import SearchInput from "./ui/SearchInput";
import Navbar from "./ui/NavBar";

export function App() {
    const navigate = useNavigate()
    function handleBack() {
        navigate(-1)
    }
    return (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
            <Navbar/>
            <div className="flex items-center gap-2 max-w-4xl mx-auto mb-6 pt-10" >
                <button 
                    onClick={handleBack}
                    className="m-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 border border-gray-600 active:scale-95 transition flex items-center gap-2">
                    ← Back
                </button>
                <SearchInput/>
            </div>
            <Outlet/>
        </div>
    )
}