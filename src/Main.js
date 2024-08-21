import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import TodatHabitPage from "./components/pages/TodayHabitPage/TodayHabitPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":studyId">
            {/* <Route index element={<ParticularPage />} /> */}
            <Route path="todayHabit" element={<TodatHabitPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
