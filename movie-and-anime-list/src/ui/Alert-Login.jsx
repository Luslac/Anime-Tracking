export default function AlertLogin() {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                <span>🔒</span>
                <span className="font-medium">Login to add anime</span>
                <a href="/login" className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-full text-sm">
                    Login
                </a>
            </div>
        </div>
    )
}