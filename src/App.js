import { Routes, Route } from 'react-router-dom';
import CellarPage from './pages/CellarPage';
import SelectedWine from './components/SelectedWine';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<CellarPage />} />
        <Route path="/edit-Selected-Wine/:id" element={<SelectedWine />} />
      </Routes>
    </div>
  );
}

export default App;
