import React, { useState } from "react"
import Base64Image from "./Base64Image" // Assuming Base64Image is in the same directory

const ImageInput = ({ onImageChange, currentImage, defaultImageType = "png" }) => {
    const [imagePreview, setImagePreview] = useState(currentImage)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                // The result includes the Data URL scheme (e.g., "data:image/png;base64,"),
                // which is what Base64Image component expects if it doesn't have it.
                // We can pass the full result or strip the prefix if the backend expects only the Base64 part.
                // For now, let's assume onImageChange expects the full data URL or just the base64 string.
                // Let's pass the full data URL for preview and the base64 part for the parent.
                const fullDataUrl = reader.result
                setImagePreview(fullDataUrl)

                // Extract only the Base64 part if needed by parent/backend
                const base64String = fullDataUrl.split(",")[1]
                onImageChange(base64String) // Pass only the Base64 string to the parent
            }
            reader.readAsDataURL(file)
        }
    }

    // Update preview if currentImage prop changes from parent
    React.useEffect(() => {
        if (currentImage && !currentImage.startsWith("data:image")) {
            setImagePreview(`data:image/${defaultImageType};base64,${currentImage}`)
        } else {
            setImagePreview(currentImage)
        }
    }, [currentImage, defaultImageType])

    return (
        <div className="form-group">
            <label className="form-label" htmlFor="image-input">
                Image:
            </label>
            <input type="file" id="image-input" accept="image/*" onChange={handleFileChange} className="form-input mb-2" />
            {imagePreview && (
                <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                    <Base64Image
                        base64String={imagePreview} // Base64Image can handle full data URL or just base64 string
                        altText="Preview"
                        className="h-32 w-32 object-contain rounded border"
                    />
                </div>
            )}
            {!imagePreview && <p className="text-xs text-gray-500">No image selected.</p>}
        </div>
    )
}

export default ImageInput
