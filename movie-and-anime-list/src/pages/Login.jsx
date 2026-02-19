import { useState } from "react"
import { useNavigate, Link } from "react-router"

export default function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/v1/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const result = await response.json() 
            if (result.success) {
                localStorage.setItem('token', result.data.token) 
                localStorage.setItem('user', JSON.stringify(result.data.user))
                navigate("/")
            } else {
                setError(result.errors || "Login failed")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                
                <div className="text-center">
                    <Link to="/">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Wibu Discovery 
                        </h1>
                    </Link>
                    <p className="text-gray-400 text-lg">Welcome back!</p>
                </div>

                <div className="bg-[#1a2332] rounded-lg shadow-xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <input 
                                id="username"
                                type="text" 
                                value={username} 
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input 
                                id="password"
                                type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition font-medium text-lg disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}