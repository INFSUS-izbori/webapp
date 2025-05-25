import React, { useState } from "react"
import Base64Image from "./Base64Image"

const ImageInput = ({ onImageChange, currentImage, defaultImageType = "png" }) => {
    const [imagePreview, setImagePreview] = useState(currentImage)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const fullDataUrl = reader.result
                setImagePreview(fullDataUrl)

                const base64String = fullDataUrl.split(",")[1]
            }
            reader.readAsDataURL(file)
        }
    }

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
                        base64String={imagePreview}
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
