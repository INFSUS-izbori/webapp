import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CandidatesListPage from "./views/CandidatesListPage"
import PartyListPage from "./views/PartyListPage"
import CandidateEditPage from "./views/CandidateEditPage"
import PartyEditPage from "./views/PartyEditPage"
import PartyDetailPage from "./views/PartyDetailPage"

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container-app">
                {" "}
                <Routes>
                    <Route path="/" element={<Navigate to="/parties" />} />
                    <Route path="/candidates" element={<CandidatesListPage />} />
                    <Route path="/candidates/new" element={<CandidateEditPage />} />
                    <Route path="/candidates/:id" element={<CandidateEditPage />} />
                    <Route path="/parties" element={<PartyListPage />} />
                    <Route path="/parties/new" element={<PartyEditPage />} />
                    <Route path="/parties/:id" element={<PartyEditPage />} />
                    <Route path="/parties/detail/:id" element={<PartyDetailPage />} />
                    <Route path="*" element={<Navigate to="/parties" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
