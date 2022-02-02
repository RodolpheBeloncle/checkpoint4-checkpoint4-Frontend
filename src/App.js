import { Routes, Route } from 'react-router-dom';
import CellarPage from './pages/CellarPage';
import Wine from './components/Wine';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CellarPage />} />
        <Route path="/edit-Selected-Wine/:id" element={<Wine />} />
      </Routes>
    </div>
  );
}

export default App;
