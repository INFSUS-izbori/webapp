import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import CandidatesListPage from "./components/CandidatesListPage"
import PartyListPage from "./components/PartyListPage"
import CandidateEditPage from "./components/CandidateEditPage"
import PartyEditPage from "./components/PartyEditPage"
import PartyDetailPage from "./components/PartyDetailPage" // Import the new detail page

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {" "}
                {/* Added some padding to the main container */}
                <Routes>
                    <Route path="/" element={<Navigate to="/parties" />} />
                    <Route path="/candidates" element={<CandidatesListPage />} />
                    <Route path="/candidates/:id" element={<CandidateEditPage />} />
                    <Route path="/parties" element={<PartyListPage />} />
                    <Route path="/parties/:id" element={<PartyEditPage />} />
                    <Route path="/parties/detail/:id" element={<PartyDetailPage />} /> {/* Add route for party detail */}
                    <Route path="*" element={<Navigate to="/parties" />} /> {/* Redirect any unknown routes to parties */}
                </Routes>
            </div>
        </Router>
    )
}

export default App
