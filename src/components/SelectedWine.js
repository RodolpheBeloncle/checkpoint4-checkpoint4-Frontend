import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import WinePairing from '../components/WinePairing';

const SelectedWine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState({});
  const [wineMatch, setWineMatch] = useState([]);

  const fetchSelectedWine = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar/${id}`);
    setWine(data);
  };

  const handleWineMatch = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/cellar/match/${id}`
    );

    console.log(data);
    setWineMatch(data);
  };
  useEffect(handleWineMatch, []);
  useEffect(fetchSelectedWine, []);

  return (
    <>
      <div>Selected SelectedWine</div>
      <div>
        <img src={wine.image} className="image" alt={wine.name} />
      </div>
      <div>
        <h2>{wine.name}</h2>
        <h3>{wine.vintage}</h3>
        <h3>{wine.type} SelectedWine</h3>
        <h3>Stock : {wine.quantity} btls</h3>
        <h2>************</h2>
        <span>
          <img
            width="200"
            src={`http://localhost:8000/${wineMatch.image}`}
            alt={wineMatch.name}
          />
          <h2>
            {wineMatch.name} goes well with {wineMatch.dishName} as a{' '}
            {wineMatch.type}
          </h2>
          <h3>{wine.vintage}</h3>
        </span>
        <h2>************</h2>
        <Link to="/">Back to wine cellar</Link>
        <button type="button">modify</button>
      </div>
    </>
  );
};

export default SelectedWine;
