import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wines = () => {
  const [winesStock, setWinesStock] = useState('');

  const fetchAllStockedWines = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/cellar`);
    setWinesStock(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_URL}/api/cellar/${id}`, id);
    await fetchAllStockedWines();
    alert('deleted wine');
  };

  useEffect(fetchAllStockedWines, []);
  return (
    <div className="wines">
      <div className="wineContainer">
        {winesStock.map((wine) => (
          <>
            <div>
              <img src={wine.image} className="image" alt={wine.name} />
            </div>
            <div>
              <h2>{wine.name}</h2>
              <h3>{wine.vintage}</h3>
              <h3>{wine.type} Wine</h3>
              <Link to={`/edit-Selected-Wine/${wine.id}`}>Edit</Link>
              <button type="button" onClick={() => handleDelete(article.id)}>
                Supprimer
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Wines;
