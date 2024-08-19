import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import TodatHabitPage from "./pages/TodayHabitPage/TodayHabitPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="todayHabit" element={<TodatHabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
