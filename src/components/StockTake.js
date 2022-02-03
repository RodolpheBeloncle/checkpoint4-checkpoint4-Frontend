import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Wine from '../components/Wine';
import axios from 'axios';
import Green from '../assets/green.png';
import Red from '../assets/red.png';
import WinePairing from '../components/WinePairing';

const StockTake = () => {
  const [name, setName] = useState('');
  const [vintage, setVintage] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [totalBottle, setTotalBottle] = useState();
  // const [quantity, setQuantity] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [winesStock, setWinesStock] = useState([]);

  // const [searchQuery, setSearchQuery] = useState('');
  // const [wineMatch, setWineMatch] = useState([]);

  const fetchAllStockedWines = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar`);
    setWinesStock(data);
  };

  const fetchNumberOfBottles = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar/total`);

    await data[0].forEach((element) => setTotalBottle(element.total));
  };

  const addWine = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('vintage', vintage);
    formData.append('image', image);
    formData.append('type', type);
    await axios.post(` http://localhost:8000/api/cellar`, formData);
    await fetchAllStockedWines();
    await fetchNumberOfBottles();
    alert('wine added to winecellar!');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/cellar/${id}`, id);
    await fetchAllStockedWines();
    await fetchNumberOfBottles();
    alert('article supprimé!');
  };

  const handleQuantity = async (qty, id) => {
    const objectQuantity = { quantity: qty };
    setNewQuantity(qty);
    console.log(objectQuantity, qty);

    await axios.put(
      `http://localhost:8000/api/cellar/quantity/${id}`,
      objectQuantity
    );
    await fetchAllStockedWines();
    await fetchNumberOfBottles();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get(
  //     'http://localhost:8000/api/cellar/search',
  //     { params: { name: searchQuery } }
  //   );

  //   console.log(data);
  //   setWineMatch(data);
  // };

  useEffect(fetchNumberOfBottles, []);
  useEffect(fetchAllStockedWines, []);

  return (
    <div className="container">
      <h1>Stocks {totalBottle} bottles</h1>
      <form className="mb-3">
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
      </form>
      {/* <h1>Find wine match</h1> */}
      {/* <Search
        onSubmit={(e) => handleSubmit(e)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <span>
        {searchQuery &&
          wineMatch.map((match) => (
            <WinePairing
              image={match.image}
              name={match.dishName}
              type={match.type}
            />
          ))}
      </span> */}
      <section className="winesContainer">
        {winesStock.map((wine) => (
          <div className="wineContainer" key={wine.id}>
            <div>
              <img
                width="200"
                src={`http://localhost:8000/${wine.image}`}
                alt={wine.name}
              />
            </div>
            <div>
              <h2>{wine.name}</h2>
              <h3>{wine.vintage}</h3>
              <h3>{wine.type} Wine</h3>
              <h3>Quantity {wine.quantity}</h3>
              {wine.quantity < 2 ? (
                <img src={Red} width="10" alt="red circle" />
              ) : (
                <img src={Green} width="10" alt="green circle" />
              )}
              <input
                type="number"
                min="0"
                onChange={(e) => setNewQuantity(e.target.value)}
                onClick={() => handleQuantity(newQuantity, wine.id)}
              />
              <Link to={`/edit-Selected-Wine/${wine.id}`}>Details</Link>
              <button type="button" onClick={() => handleDelete(wine.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StockTake;
