// import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import StudyPage from "./components/pages/StudyPage/StudyPage";
import TodatHabitPage from "./components/pages/TodayHabitPage/TodayHabitPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>home page</h1>} />
        <Route path="/study/:studyId/todayHabit" element={<TodatHabitPage />} />
        <Route path="/study/:studyId" element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
