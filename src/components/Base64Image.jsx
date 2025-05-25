import React from "react"

const Base64Image = ({ base64String, altText = "Image", className = "", defaultImageType = "png" }) => {
    if (!base64String || typeof base64String !== "string" || base64String.trim() === "") {
        return <span className={`text-xs text-gray-500 ${className}`}>No Image</span>
    }

    let imageSrc = base64String
    if (!base64String.startsWith("data:image")) {
        imageSrc = `data:image/${defaultImageType};base64,${base64String}`
    }

    return (
        <img
            src={imageSrc}
            alt={altText}
            className={className}
            onError={(e) => {
                e.target.style.display = "none"
                const errorSpan = document.createElement("span")
                errorSpan.className = `text-xs text-red-500 ${className}`
                errorSpan.textContent = "Invalid Image"
                if (e.target.parentNode) {
                    e.target.parentNode.insertBefore(errorSpan, e.target.nextSibling)
                }
            }}
        />
    )
}

export default Base64Image
