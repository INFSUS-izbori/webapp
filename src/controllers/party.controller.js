import axios from "axios"
import Party from "../models/Party"

const API_URL = "http://localhost:3000/api/parties"

const PartyService = {
    getAll: () => {
        return axios.get(API_URL).then((response) => {
            return response.data.map(
                (partyData) =>
                    new Party(
                        partyData.id,
                        partyData.name,
                        partyData.description,
                        partyData.dateOfEstablishment,
                        partyData.logo,
                        partyData.createdDate
                    )
            )
        })
    },
    getById: (id) => {
        return axios.get(`${API_URL}/${id}`).then((response) => {
            const partyData = response.data
            return new Party(
                partyData.id,
                partyData.name,
                partyData.description,
                partyData.dateOfEstablishment,
                partyData.logo,
                partyData.createdDate
            )
        })
    },
    create: (party) => {
        return axios.post(API_URL, party).then((response) => {
            const partyData = response.data
            return new Party(
                partyData.id,
                partyData.name,
                partyData.description,
                partyData.dateOfEstablishment,
                partyData.logo,
                partyData.createdDate
            )
        })
    },
    update: (id, party) => {
        return axios.put(`${API_URL}/${id}`, party).then((response) => {
            const partyData = response.data
            return new Party(
                partyData.id,
                partyData.name,
                partyData.description,
                partyData.dateOfEstablishment,
                partyData.logo,
                partyData.createdDate
            )
        })
    },
    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`)
    },
}

export default PartyService
