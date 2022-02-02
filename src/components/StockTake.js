import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Wine from '../components/Wine';
import axios from 'axios';
import WinePairing from '../components/WinePairing';

const StockTake = () => {
  const [name, setName] = useState('');
  const [vintage, setVintage] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [winesStock, setWinesStock] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [wineMatch, setWineMatch] = useState([]);

  const fetchAllStockedWines = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar`);
    setWinesStock(data);
  };

  const addWine = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('vintage', vintage);
    formData.append('image', image);
    formData.append('type', type);
    await axios.post(` http://localhost:8000/api/cellar`, formData);
    await fetchAllStockedWines();
    alert('wine added to winecellar!');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/cellar/${id}`, id);
    await fetchAllStockedWines();
    alert('article supprimé!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      'http://localhost:8000/api/cellar/search',
      { params: { name: searchQuery } }
    );

    console.log(data);
    setWineMatch(data);
  };

  useEffect(fetchAllStockedWines, []);

  return (
    <div>
      <h1>Stock</h1>
      <label htmlFor="name">
        Wine Appellation
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
          onChange={(event) => setImage(event.target.files[0])}
        />
      </label>
      <label>
        type of wine
        <input
          className="input"
          id="type"
          type="type"
          onChange={(event) => setType(event.target.value)}
        />
      </label>
      <button type="button" onClick={addWine}>
        Add wine
      </button>
      <h1>Find wine match</h1>
      <Search
        onSubmit={(e) => handleSubmit(e)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <span>
        {searchQuery &&
          wineMatch.map((match) => (
            <WinePairing
              image={match.image}
              name={match.name}
              type={match.type}
            />
          ))}
      </span>
      <section className="winesContainer">
        {winesStock.map((wine) => (
          <Wine
            key={wine.id}
            id={wine.id}
            image={wine.image}
            name={wine.name}
            vintage={wine.vintage}
            type={wine.type}
            handleDelete={() => handleDelete(wine.id)}
          />
        ))}
      </section>
    </div>
  );
};

export default StockTake;
