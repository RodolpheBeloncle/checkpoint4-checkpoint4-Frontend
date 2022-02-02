import { Routes, Route } from 'react-router-dom';
import CellarPage from './pages/CellarPage';
import Wine from './components/Wine';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<CellarPage />} />
        <Route path="/editSelectedWine/:id" element={<Wine />} />
      </Routes>
    </div>
  );
}

export default App;
