import { Link } from "react-router"

export default function AlertLogin() {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span className="font-medium">Login to add anime</span>
                <Link to={`/login`} className="bg-blue-600 p-2 rounded-xl hover:scale-105 " >
                    Login
                </Link>
            </div>
        </div>
    )
}