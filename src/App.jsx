import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CandidatesListPage from "./views/CandidatesListPage"
import PartyListPage from "./views/PartyListPage"
import CandidateEditPage from "./views/CandidateEditPage"
import PartyEditPage from "./views/PartyEditPage"
import PartyDetailPage from "./views/PartyDetailPage" // Import the new detail page

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container-app">
                {" "}
                {/* Use the new container class from index.css */}
                <Routes>
                    <Route path="/" element={<Navigate to="/parties" />} />
                    <Route path="/candidates" element={<CandidatesListPage />} />
                    <Route path="/candidates/new" element={<CandidateEditPage />} /> {/* Add route for new candidate */}
                    <Route path="/candidates/:id" element={<CandidateEditPage />} />
                    <Route path="/parties" element={<PartyListPage />} />
                    <Route path="/parties/new" element={<PartyEditPage />} /> {/* Add route for new party */}
                    <Route path="/parties/:id" element={<PartyEditPage />} />
                    <Route path="/parties/detail/:id" element={<PartyDetailPage />} /> {/* Add route for party detail */}
                    <Route path="*" element={<Navigate to="/parties" />} /> {/* Redirect any unknown routes to parties */}
                </Routes>
            </div>
        </Router>
    )
}

export default App
