import React, { useState, useEffect } from "react"
import PartyService from "../services/party.service"
import { useParams, useNavigate, Link } from "react-router-dom"
import Base64Image from "./Base64Image" // Import Base64Image for preview

const PartyEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [party, setParty] = useState({
        name: "",
        description: "",
        dateOfEstablishment: "",
        logo: "",
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchParty = async () => {
            if (id === "new") {
                // Handle new party creation
                setParty({
                    name: "",
                    description: "",
                    dateOfEstablishment: new Date().toISOString().split("T")[0], // Default to today
                    logo: "",
                })
                setLoading(false)
                return
            }
            try {
                setLoading(true)
                const response = await PartyService.getById(id)
                // Ensure date is in YYYY-MM-DD format for the input type="date"
                const fetchedParty = response.data
                if (fetchedParty.dateOfEstablishment) {
                    fetchedParty.dateOfEstablishment = new Date(fetchedParty.dateOfEstablishment).toISOString().split("T")[0]
                }
                setParty(fetchedParty)
                setError(null)
            } catch (err) {
                console.error("Error fetching party:", err)
                setError("Failed to load party data.")
            } finally {
                setLoading(false)
            }
        }

        fetchParty()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setParty({ ...party, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (id === "new") {
                await PartyService.create(party) // Assuming you have a create method in PartyService
            } else {
                await PartyService.update(id, party)
            }
            navigate("/parties")
        } catch (error) {
            console.error("Error saving party:", error)
            setError("Failed to save party. Please check the details and try again.")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500">Loading party editor...</p>
            </div>
        )
    }

    return (
        <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">{id === "new" ? "Create New Party" : "Edit Party"}</h2>
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name:
                    </label>
                    <input className="form-input" id="name" type="text" name="name" value={party.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="form-input h-24"
                        id="description"
                        name="description"
                        value={party.description}
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
                        value={party.dateOfEstablishment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="logo">
                        Logo (Base64 String):
                    </label>
                    <textarea className="form-input h-32" id="logo" name="logo" value={party.logo} onChange={handleChange} />
                    {party.logo && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Logo Preview:</p>
                            <Base64Image
                                base64String={party.logo}
                                altText="Party Logo Preview"
                                className="h-24 w-24 object-contain rounded border"
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-start space-x-4 pt-4">
                    <button className="btn btn-primary" type="submit">
                        {id === "new" ? "Create Party" : "Update Party"}
                    </button>
                    <Link to={id === "new" ? "/parties" : `/parties/detail/${id}`} className="btn btn-secondary">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default PartyEditPage
