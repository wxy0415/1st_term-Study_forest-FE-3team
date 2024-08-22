import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Home from './components/pages/Home/Home.js';
import CreateStudy from './components/pages/CreateStudy/CreateStudy.js';
import DetailStudy from './components/pages/DetailStudy/DetailStudy.js';
import TodaysFocus from './components/pages/todaysFocus/TodaysFocus.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateStudy />} />
        <Route path="/study/:id" element={<DetailStudy />} />
        <Route path="/todaysFocus" element={<TodaysFocus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
