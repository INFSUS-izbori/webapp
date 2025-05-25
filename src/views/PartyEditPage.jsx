import React, { useState, useEffect } from "react"
import PartyService from "../controllers/party.controller"
import { useParams, useNavigate, Link } from "react-router-dom"
import Party from "../models/Party"
import ImageInput from "../components/ImageInput"
import ToastMessage from "../components/ToastMessage"

const usePartyFormLogic = (id, navigate) => {
    const [party, setParty] = useState(new Party("", "", "", new Date().toISOString().split("T")[0], ""))
    const [message, setMessage] = useState({ text: "", type: "", visible: false })
    const isEditing = !!id

    useEffect(() => {
        if (isEditing) {
            PartyService.getById(id)
                .then((fetchedParty) => {
                    if (fetchedParty.dateOfEstablishment) {
                        fetchedParty.dateOfEstablishment = new Date(fetchedParty.dateOfEstablishment).toISOString().split("T")[0]
                    }
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
            setParty(new Party("", "", "", new Date().toISOString().split("T")[0], ""))
        }
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setParty((prevParty) => ({ ...prevParty, [name]: value }))
    }

    const handleLogoChange = (base64String) => {
        setParty((prevParty) => ({ ...prevParty, logo: base64String }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage({ text: "", type: "", visible: false })

        const partyToSubmit = {
            name: party.name,
            description: party.description,
            dateOfEstablishment: party.dateOfEstablishment,
            logo: party.logo,
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
    const { party, handleChange, handleSubmit, handleLogoChange, isEditing, message, setMessage } = usePartyFormLogic(id, navigate)

    return (
        <div className="card max-w-2xl mx-auto">
            {message.visible && (
                <ToastMessage message={message.text} type={message.type} onClose={() => setMessage({ ...message, visible: false })} />
            )}
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">{isEditing ? "Edit Party" : "Create New Party"}</h2>
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
                <ImageInput
                    onImageChange={handleLogoChange}
                    currentImage={party.logo}
                    defaultImageType="png"
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
