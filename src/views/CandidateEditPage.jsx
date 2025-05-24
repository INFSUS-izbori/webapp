import React, { useState, useEffect } from "react"
import CandidateService from "../controllers/candidate.controller"
import PartyService from "../controllers/party.controller" // Import PartyService
import { useParams, useNavigate, Link } from "react-router-dom"
// import Base64Image from "../components/Base64Image" // Import the Base64Image component - No longer needed here directly for input
import Candidate from "../models/Candidate" // Import the Candidate model
import ImageInput from "../components/ImageInput" // Import the ImageInput component
import ToastMessage from "../components/ToastMessage" // Import the ToastMessage component

// Custom hook for candidate form logic
const useCandidateFormLogic = (id, navigate) => {
    const [candidate, setCandidate] = useState(new Candidate("", "", "", "", "", "")) // Initialize with an empty Candidate model
    const [parties, setParties] = useState([]) // State for parties
    const [message, setMessage] = useState({ text: "", type: "", visible: false }) // State for toast messages
    const isEditing = !!id // Determine if we are editing or creating

    useEffect(() => {
        if (isEditing) {
            CandidateService.getById(id)
                .then((data) => {
                    // Ensure the image data is just the Base64 string for the ImageInput component
                    const candidateData = { ...data }
                    if (candidateData.image && candidateData.image.startsWith("data:image")) {
                        candidateData.image = candidateData.image.split(",")[1]
                    }
                    setCandidate(candidateData)
                })
                .catch((error) => {
                    console.error("Error fetching candidate:", error)
                })
        }
        // Fetch all parties
        PartyService.getAll()
            .then((data) => {
                setParties(data)
            })
            .catch((error) => {
                console.error("Error fetching parties:", error)
            })
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "partyId") {
            // Handle "Nezavisan" option specifically if its value is ""
            setCandidate((prevCandidate) => ({ ...prevCandidate, [name]: value === "" ? null : value }))
        } else if (name === "oib") {
            // Allow only numbers and limit length for OIB
            const numericValue = value.replace(/[^0-9]/g, "")
            if (numericValue.length <= 11) {
                setCandidate((prevCandidate) => ({ ...prevCandidate, [name]: numericValue }))
            }
        } else {
            setCandidate((prevCandidate) => ({ ...prevCandidate, [name]: value }))
        }
    }

    // New handler for image changes from ImageInput component
    const handleImageChange = (base64String) => {
        setCandidate((prevCandidate) => ({ ...prevCandidate, image: base64String }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage({ text: "", type: "", visible: false }) // Reset message
        // Ensure partyId is null if it's an empty string from the "Nezavisan" option
        // Ensure image is just the base64 string
        const candidateToSubmit = {
            ...candidate,
            partyId: candidate.partyId === "" ? null : candidate.partyId,
            image: candidate.image, // Already a Base64 string from handleImageChange
        }

        if (isEditing) {
            CandidateService.update(id, candidateToSubmit)
                .then(() => {
                    setMessage({ text: "Candidate updated successfully!", type: "success", visible: true })
                    setTimeout(() => navigate("/candidates"), 2000) // Navigate after showing message
                })
                .catch((error) => {
                    console.error("Error updating candidate:", error)
                    setMessage({ text: `Error updating candidate: ${error.message}`, type: "error", visible: true })
                })
        } else {
            // Create new candidate
            CandidateService.create(candidateToSubmit)
                .then(() => {
                    setMessage({ text: "Candidate created successfully!", type: "success", visible: true })
                    setTimeout(() => navigate("/candidates"), 2000) // Navigate after showing message
                })
                .catch((error) => {
                    console.error("Error creating candidate:", error)
                    setMessage({ text: `Error creating candidate: ${error.message}`, type: "error", visible: true })
                })
        }
    }

    return { candidate, parties, handleChange, handleSubmit, handleImageChange, isEditing, message, setMessage } // Return parties and handleImageChange
}

const CandidateEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { candidate, parties, handleChange, handleSubmit, handleImageChange, isEditing, message, setMessage } = useCandidateFormLogic(
        id,
        navigate
    )

    return (
        <div className="card max-w-2xl mx-auto">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">{isEditing ? "Edit Candidate" : "Create Candidate"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="form-label" htmlFor="oib">
                        {isEditing ? "OIB:" : "OIB (Uneditable after creation):"}
                    </label>
                    <input
                        readOnly={isEditing}
                        className="form-input"
                        id="oib"
                        type="text" // Changed to text to control input via handleChange
                        name="oib"
                        value={candidate.oib}
                        onChange={handleChange}
                        maxLength={11} // Max length for OIB
                        pattern="[0-9]*" // Suggest numeric input, but validation is in handleChange
                        required={!isEditing} // OIB is required only when creating
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="form-input"
                        id="name"
                        type="text"
                        name="name"
                        value={candidate.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Replace textarea with ImageInput component */}
                <ImageInput
                    onImageChange={handleImageChange}
                    currentImage={candidate.image} // Pass the current image (Base64 string)
                />
                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="form-input h-24"
                        id="description"
                        name="description"
                        value={candidate.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="partyId">
                        Party:
                    </label>
                    <select
                        className="form-input"
                        id="partyId"
                        name="partyId"
                        value={candidate.partyId === null || candidate.partyId === undefined ? "" : candidate.partyId}
                        onChange={handleChange}>
                        <option value="">Nezavisan</option>
                        {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                                {party.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-start space-x-4 pt-4">
                    <button className="btn btn-primary" type="submit">
                        {isEditing ? "Update Candidate" : "Create Candidate"}
                    </button>
                    <Link to="/candidates" className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CandidateEditPage
