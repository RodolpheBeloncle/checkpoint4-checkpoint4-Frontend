import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SelectedWine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState({});

  const fetchSelectedWine = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/cellar/${id}`
    );
    setWine(data);
  };

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
        <Link to="/">Back to wine cellar</Link>
      </div>
    </>
  );
};

export default SelectedWine;
