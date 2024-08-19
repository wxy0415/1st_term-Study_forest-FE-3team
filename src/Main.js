import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import TodatHabitPage from "./pages/TodayHabitPage/TodayHabitPage";
import ParticularPage from "./pages/ParticularPage/Particularpage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":studyId">
            <Route index element={<ParticularPage />} />
            <Route path="todayHabit" element={<TodatHabitPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
