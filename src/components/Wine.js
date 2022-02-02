import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Wine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState({});

  const fetchSelectedWine = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/cellar/${id}`
    );
    setWine(data);
  };

  useEffect(fetchSelectedWine, []);

  return (
    <>
      <div>Selected Wine</div>
      <div>
        <img src={wine.image} className="image" alt={wine.name} />
      </div>
      <div>
        <h2>{wine.name}</h2>
        <h3>{wine.vintage}</h3>
        <h3>{wine.type} Wine</h3>
        <Link to="/">Edit</Link>
      </div>
    </>
  );
};

export default Wine;
