import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CandidatesListPage from "./components/CandidatesListPage";
import PartyListPage from "./components/PartyListPage";
import CandidateEditPage from "./components/CandidateEditPage";
import PartyEditPage from "./components/PartyEditPage";

const App = () => {
	return (
		<Router>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Navigate to="/parties" />} />
					<Route path="/candidates" element={<CandidatesListPage />} />
					<Route path="/candidates/:id" element={<CandidateEditPage />} />
					<Route path="/parties" element={<PartyListPage />} />
					<Route path="/parties/:id" element={<PartyEditPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
