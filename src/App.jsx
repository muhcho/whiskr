import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import StartPage from "./pages/StartPage";
import ExplorePage from "./pages/ExplorePage";
import DonationsPage from "./pages/DonationsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import CreateChallengePage from "./pages/CreateChallengePage";
import ChallengesPage from "./pages/ChallengesPage";
import AccountPage from "./pages/AccountPage";


function App() {
  return (
    <main className="app">
      <NavBar />
      <Routes>
      <Route path="/" element={<StartPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/create-challenge" element={<CreateChallengePage />} />
        <Route path="/challenge" element={<ChallengesPage />} />
        <Route path="/account" element={<AccountPage />} />

      </Routes>
    </main>
  );
}

export default App;
