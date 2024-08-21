import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TADAYSFOCUS from './components/pages/todaysFocus/TodaysFocus'
import MAIN from './main'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <header className='App-header'></header>
            <Routes>
              <Route path='/' element={<MAIN />} />
              <Route path='/todaysFocus' element={<TADAYSFOCUS />} />
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
