import axios from "axios"

const API_URL = "http://localhost:3000/api/parties"

const PartyService = {
    getAll: () => {
        return axios.get(API_URL)
    },
    getById: (id) => {
        return axios.get(`${API_URL}/${id}`)
    },
    update: (id, party) => {
        return axios.put(`${API_URL}/${id}`, party)
    },
    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`)
    },
}

export default PartyService
