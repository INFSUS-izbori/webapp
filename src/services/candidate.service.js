import axios from "axios";

const API_URL = "http://localhost:3000/api/candidates";

const CandidateService = {
	getAll: () => {
		return axios.get(API_URL);
	},
	getById: (id) => {
		return axios.get(`${API_URL}/${id}`);
	},
	update: (id, candidate) => {
		return axios.put(`${API_URL}/${id}`, candidate);
	},
	delete: (id) => {
		return axios.delete(`${API_URL}/${id}`);
	},
};

export default CandidateService;
