import { Link } from 'react-router'

export default function Navbar() {
    return (
    <nav className="border-b rounded-xl px-6 py-4 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        
            
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
                Wibu Discovery 🚀
            </Link>
    
            
            <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-300 hover:text-white transition">
                    Home
                </Link>

                <Link to="/my-list" className="text-gray-300 hover:text-white transition">
                    My List
                </Link>

                <Link to="/about" className="text-gray-300 hover:text-white transition">
                    About
                </Link>
            </div>
    
        </div>
    </nav>
    )
}