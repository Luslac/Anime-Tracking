import { useEffect } from "react"

export default function AlreadyInList({ onClose, title }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000) 
        
        return () => clearTimeout(timer)
    }, [onClose])
    
    return (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]">

                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">!</span>
                </div>

                <div className="flex-1">
                    <p className="font-bold text-lg">Already In List</p>
                    <p className="text-sm text-white/90 line-clamp-1">{title}</p>
                </div>
                
                <button 
                    onClick={onClose}
                    className="flex-shrink-0 text-white/80 hover:text-white transition"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
