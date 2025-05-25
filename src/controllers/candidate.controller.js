import axios from "axios"
import Candidate from "../models/Candidate"

const API_URL = "http://localhost:3000/api/candidates"

const CandidateService = {
    getAll: () => {
        return axios.get(API_URL).then((response) => {
            return response.data.map(
                (candidateData) =>
                    new Candidate(
                        candidateData.id,
                        candidateData.oib,
                        candidateData.name,
                        candidateData.image,
                        candidateData.description,
                        candidateData.partyId,
                        candidateData.createdDate
                    )
            )
        })
    },
    getById: (id) => {
        return axios.get(`${API_URL}/${id}`).then((response) => {
            const candidateData = response.data
            return new Candidate(
                candidateData.id,
                candidateData.oib,
                candidateData.name,
                candidateData.image,
                candidateData.description,
                candidateData.partyId,
                candidateData.createdDate
            )
        })
    },
    create: (candidate) => {
        const candidateToCreate = {
            ...candidate,
            partyId: candidate.partyId === "" || candidate.partyId === undefined ? null : candidate.partyId,
        }
        return axios.post(API_URL, candidateToCreate).then((response) => {
            return new Candidate(
                response.data.id,
                response.data.oib,
                response.data.name,
                response.data.image,
                response.data.description,
                response.data.partyId,
                response.data.createdDate
            )
        })
    },
    update: (id, candidate) => {
        return axios.put(`${API_URL}/${id}`, candidate).then((response) => {
            return response.data
        })
    },
    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`).then((response) => {
            return response.data
        })
    },
}

export default CandidateService
