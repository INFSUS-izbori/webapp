import React, { useState, useEffect } from "react"
import PartyService from "../controllers/party.controller"
import { useParams, useNavigate, Link } from "react-router-dom"
import Party from "../models/Party" // Ensure Party model is imported
import ImageInput from "../components/ImageInput" // Import ImageInput
import ToastMessage from "../components/ToastMessage" // Import ToastMessage

// Custom hook for party form logic
const usePartyFormLogic = (id, navigate) => {
    // Initialize with all fields from the Party model
    const [party, setParty] = useState(new Party("", "", "", new Date().toISOString().split("T")[0], ""))
    const [message, setMessage] = useState({ text: "", type: "", visible: false })
    const isEditing = !!id

    useEffect(() => {
        if (isEditing) {
            PartyService.getById(id)
                .then((fetchedParty) => {
                    // Ensure date is in YYYY-MM-DD format
                    if (fetchedParty.dateOfEstablishment) {
                        fetchedParty.dateOfEstablishment = new Date(fetchedParty.dateOfEstablishment).toISOString().split("T")[0]
                    }
                    // Ensure logo is just the Base64 string for ImageInput
                    if (fetchedParty.logo && fetchedParty.logo.startsWith("data:image")) {
                        fetchedParty.logo = fetchedParty.logo.split(",")[1]
                    }
                    setParty(fetchedParty)
                })
                .catch((error) => {
                    console.error("Error fetching party:", error)
                    setMessage({ text: `Error fetching party: ${error.message}`, type: "error", visible: true })
                })
        } else {
            // For creating a new party, ensure the state is a fresh Party object with default date
            setParty(new Party("", "", "", new Date().toISOString().split("T")[0], ""))
        }
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setParty((prevParty) => ({ ...prevParty, [name]: value }))
    }

    // Handler for logo changes from ImageInput component
    const handleLogoChange = (base64String) => {
        setParty((prevParty) => ({ ...prevParty, logo: base64String }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage({ text: "", type: "", visible: false }) // Reset message

        // Ensure all fields are included for submission
        const partyToSubmit = {
            name: party.name,
            description: party.description,
            dateOfEstablishment: party.dateOfEstablishment,
            logo: party.logo, // Already a Base64 string from handleLogoChange
        }

        if (isEditing) {
            PartyService.update(id, partyToSubmit)
                .then(() => {
                    setMessage({ text: "Party updated successfully!", type: "success", visible: true })
                    setTimeout(() => navigate("/parties"), 2000)
                })
                .catch((error) => {
                    console.error("Error updating party:", error)
                    const errorMessage =
                        error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                    setMessage({ text: `Error updating party: ${errorMessage}`, type: "error", visible: true })
                })
        } else {
            // Create new party
            PartyService.create(partyToSubmit)
                .then(() => {
                    setMessage({ text: "Party created successfully!", type: "success", visible: true })
                    setTimeout(() => navigate("/parties"), 2000)
                })
                .catch((error) => {
                    console.error("Error creating party:", error)
                    const errorMessage =
                        error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
                    setMessage({ text: `Error creating party: ${errorMessage}`, type: "error", visible: true })
                })
        }
    }

    return { party, handleChange, handleSubmit, handleLogoChange, isEditing, message, setMessage }
}

const PartyEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    // Removed the local useState for party, loading, error as usePartyFormLogic handles party state
    const { party, handleChange, handleSubmit, handleLogoChange, isEditing, message, setMessage } = usePartyFormLogic(id, navigate)

    // Loading state can be inferred from party object if needed, or added to usePartyFormLogic
    // For simplicity, assuming party object is sufficient to determine loading/readiness for render

    // This useEffect for fetching data is now handled within usePartyFormLogic
    // useEffect(() => {
    //     // ...
    // }, [id]);

    // if (loading) { // loading state would need to be exposed from usePartyFormLogic if used here
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <p className="text-lg text-gray-500">Loading party editor...</p>
    //         </div>
    //     );
    // }

    return (
        <div className="card max-w-2xl mx-auto">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">{isEditing ? "Edit Party" : "Create New Party"}</h2>
            {/* {error && <div className="alert alert-danger mb-4">{error}</div>} Removed, message state handles errors */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="form-input"
                        id="name"
                        type="text"
                        name="name"
                        value={party.name || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="form-input h-24"
                        id="description"
                        name="description"
                        value={party.description || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="dateOfEstablishment">
                        Date of Establishment:
                    </label>
                    <input
                        className="form-input"
                        id="dateOfEstablishment"
                        type="date"
                        name="dateOfEstablishment"
                        value={party.dateOfEstablishment || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Replace textarea with ImageInput component for logo */}
                <ImageInput
                    onImageChange={handleLogoChange}
                    currentImage={party.logo} // Pass the current logo (Base64 string)
                    defaultImageType="png" // Or appropriate default
                />
                <div className="flex items-center justify-start space-x-4 pt-4">
                    <button className="btn btn-primary" type="submit">
                        {isEditing ? "Update Party" : "Create Party"}
                    </button>
                    <Link to={isEditing ? `/parties/detail/${id}` : "/parties"} className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default PartyEditPage
