import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import ExplorePage from "./pages/ExplorePage";
import DonationsPage from "./pages/DonationsPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import CreateChallengePage from "./pages/CreateChallengePage";
import ChallengesPage from "./pages/ChallengesPage";
import AccountPage from "./pages/AccountPage";
import NavBar from "./components/NavBar";
import UserPostDetailsPage from "./pages/UserPostDetailsPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  const location = useLocation(); // Access the current route location

  return (
    <main className="app">
      {/* Conditionally render NavBar if not on StartPage */}
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/create-challenge" element={<CreateChallengePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/post/:id" element={<UserPostDetailsPage />} />
        <Route path="/edit-post/:id" element={<EditPostPage />} />


      </Routes>
    </main>
  );
}

export default App;
