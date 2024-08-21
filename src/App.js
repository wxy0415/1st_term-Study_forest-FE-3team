import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TADAYSFOCUS from './components/pages/todaysFocus/TodaysFocus'
import MAIN from './main'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <header></header>
          <main>
            <Routes>
              <Route path='/' element={<MAIN />} />
              <Route path='/todaysFocus' element={<TADAYSFOCUS />} />
            </Routes>
          </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
