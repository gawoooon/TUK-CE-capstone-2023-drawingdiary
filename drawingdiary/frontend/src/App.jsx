import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./components/album/CategoryList";

import LoginPage from "./pages/LoginPage.jsx";
import LoginLostPage from "./pages/LoginLostPage.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import DiaryPage from "./pages/DiaryPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import ChoosePersonalityPage from "./pages/ChoosePersonalityPage";
import FinishPage from "./pages/FinishPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginlost" element={<LoginLostPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route
          path="/diary/:memberId/:dateId"
          element={
            <CategoryProvider>
              <DiaryPage />
            </CategoryProvider>
          }
        />

        <Route
          path="/album"
          element={
            <CategoryProvider>
              <AlbumPage />
            </CategoryProvider>
          }
        />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/choosePersonality" element={<ChoosePersonalityPage />} />
        <Route path="/FinishPage" element={<FinishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
