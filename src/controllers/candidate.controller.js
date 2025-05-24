import axios from "axios"
import Candidate from "../models/Candidate" // Import the Candidate model

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
        // Ensure partyId is null if it's an empty string or undefined
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
        // Assuming candidate is an instance of Candidate or a plain object
        // If it's a Candidate instance, you might want to convert it to a plain object
        // if the API expects that. For now, we'll pass it as is.
        return axios.put(`${API_URL}/${id}`, candidate).then((response) => {
            // Optionally, return the updated candidate data or a success message
            return response.data
        })
    },
    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`).then((response) => {
            // Optionally, return a success message or the response data
            return response.data
        })
    },
}

export default CandidateService
