import React from "react"

const Base64Image = ({ base64String, altText = "Image", className = "", defaultImageType = "png" }) => {
    if (!base64String || typeof base64String !== "string" || base64String.trim() === "") {
        // Return a placeholder or null if the string is invalid or empty
        return <span className={`text-xs text-gray-500 ${className}`}>No Image</span>
    }

    let imageSrc = base64String
    // Check if the string already has the data URI scheme
    if (!base64String.startsWith("data:image")) {
        // If not, prepend the scheme.
        imageSrc = `data:image/${defaultImageType};base64,${base64String}`
    }

    return (
        <img
            src={imageSrc}
            alt={altText}
            className={className}
            onError={(e) => {
                // Fallback for broken images or invalid base64 strings
                // You can replace this with a more sophisticated placeholder
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
