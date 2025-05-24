import React, { useState, useEffect } from "react"
import PartyService from "../services/party.service"
import { useParams, useNavigate } from "react-router-dom"

const PartyEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [party, setParty] = useState({
        name: "",
        description: "",
        dateOfEstablishment: "",
        logo: "",
    })

    useEffect(() => {
        fetchParty()
    }, [id])

    const fetchParty = async () => {
        try {
            const response = await PartyService.getById(id)
            setParty(response.data)
        } catch (error) {
            console.error("Error fetching party:", error)
        }
    }

    const handleChange = (e) => {
        setParty({ ...party, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await PartyService.update(id, party)
            navigate("/parties")
        } catch (error) {
            console.error("Error updating party:", error)
        }
    }

    return (
        <div>
            <h2>Edit Party</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" value={party.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" name="description" value={party.description} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Date of Establishment:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dateOfEstablishment"
                        value={party.dateOfEstablishment}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Logo:</label>
                    <input type="text" className="form-control" name="logo" value={party.logo} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    )
}

export default PartyEdit
