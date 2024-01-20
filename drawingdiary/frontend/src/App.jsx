import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import LoginLostPage from "./pages/LoginLostPage.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import DiaryPage from "./pages/DiaryPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import MyPage from "./pages/MyPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginlost" element={<LoginLostPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/diary/:id" element={<DiaryPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
