import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/global.css';
import Home from './components/pages/Home.js';
import CreateStudy from './components/pages/CreateStudy.js';
import DetailStudy from './components/pages/DetailStudy.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateStudy />} />
        <Route path="/study/:id" element={<DetailStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
