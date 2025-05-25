import React, { useEffect } from "react"

const ToastMessage = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onClose])

    const baseStyle = "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white flex justify-between items-center"
    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
    }

    return (
        <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-xl font-semibold leading-none hover:text-gray-200">
                &times;
            </button>
        </div>
    )
}

export default ToastMessage
