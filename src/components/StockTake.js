import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wines from '../components/Wines';

const StockTake = () => {
  const [name, setName] = useState('');
  const [vintage, setVintage] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');

  return (
    <div>
      <h1>Stock</h1>
      <label htmlFor="name">
        Intitulé du vin
        <input
          className="input"
          id="name"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Vintage
        <input
          className="input"
          id="vintage"
          type="text"
          onChange={(event) => setVintage(event.target.value)}
        />
      </label>
      <label>
        Image
        <input
          className="input"
          id="file"
          type="file"
          onChange={(event) => setImage(event.target.value)}
        />
      </label>
      <label>
        <input
          className="input"
          id="type"
          type="type"
          onChange={(event) => setType(event.target.value)}
        />
      </label>
      <section className="wines">
        <Wines />
      </section>
    </div>
  );
};

export default StockTake;
