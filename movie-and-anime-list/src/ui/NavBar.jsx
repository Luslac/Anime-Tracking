import { Link, useNavigate } from 'react-router'

export default function Navbar({token}) {
    const navigate = useNavigate()

    function handleLogOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('TopAnime')
        localStorage.removeItem('AnimeSeasonNow')
        localStorage.removeItem('UpComingAnime')
        navigate("/login")
    }

    return (
    <nav className="border-b rounded-sm px-6 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
                Wibu Discovery 
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/mylist" className="text-gray-300 hover:text-white transition">
                    My List
                </Link>

                <Link to="/" className="text-gray-300 hover:text-white transition">
                    Home
                </Link>

                {token && 
                <div className="text-gray-300 hover:text-white transition" onClick={handleLogOut} >
                    Log Out
                </div>}

                {!token && 
                <Link to="/login" className="text-gray-300 round hover:text-white transition">
                    Sign In
                </Link>}
            </div>
    
        </div>
    </nav>
    )
}