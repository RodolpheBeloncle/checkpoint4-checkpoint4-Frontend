import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Green from '../assets/green.png';
import Red from '../assets/red.png';

const StockTake = () => {
  const [name, setName] = useState('');
  const [vintage, setVintage] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [totalBottle, setTotalBottle] = useState();
  const [newQuantity, setNewQuantity] = useState(null);
  const [winesStock, setWinesStock] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const radios = ['Red', 'White', 'Sweet'];

  const fetchAllStockedWines = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar`);
    setWinesStock(data);
  };

  const fetchNumberOfBottles = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/cellar/total`);

    await data[0].forEach((element) => setTotalBottle(element.total));
  };

  const addWine = async () => {
    if (window.confirm('Would you like to add this reference ?')) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('vintage', vintage);
      formData.append('image', image);
      formData.append('type', type);
      await axios.post(` http://localhost:8000/api/cellar`, formData);
      await fetchAllStockedWines();
      await fetchNumberOfBottles();
      alert('wine added to winecellar!');
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Would you like to delete this wine from your wine celar ?'
      )
    ) {
      await axios.delete(`http://localhost:8000/api/cellar/${id}`, id);
      await fetchAllStockedWines();
      await fetchNumberOfBottles();
      alert('article supprimé!');
    }
  };

  const handleQuantity = async (qty, id) => {
    const objectQuantity = { quantity: qty };
    console.log(objectQuantity, qty);

    await axios.put(
      `http://localhost:8000/api/cellar/quantity/${id}`,
      objectQuantity
    );
    await fetchAllStockedWines();
    await fetchNumberOfBottles();
  };

  useEffect(fetchNumberOfBottles, []);
  useEffect(fetchAllStockedWines, []);

  return (
    <div className="container">
      <form className="row align-items-stretch mb-5">
        <div>
          <div className="form-group mb-md-0">
            <label htmlFor="name">
              Wine Appellation
              <input
                className="form-control"
                id="name"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div className="form-group mb-md-0">
            <label>
              Vintage
              <input
                className="form-control"
                id="vintage"
                type="text"
                onChange={(event) => setVintage(event.target.value)}
              />
            </label>
          </div>
          <div className="form-group mb-md-0">
            <label>
              Image
              <input
                className="form-control"
                id="file"
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </label>
          </div>
          <div className="form-group mb-md-0">
            <label>
              type of wine
              <input
                className="form-control"
                id="type"
                type="type"
                onChange={(event) => setType(event.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-xl text-uppercase"
            onClick={addWine}
          >
            Add New Wine
          </button>
        </div>
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
      <h1>In stock {totalBottle} bottles</h1>
      <h2>Filtering</h2>
      <Form>
        {radios.map((radio) => {
          return (
            <div key={radio}>
            <Form.Check 
                type="switch"
                value={radio}
                id={radio}
                checked={radio === selectedRadio}
                onChange={(e) => setSelectedRadio(e.target.value)}
              />
              <label htmlFor={radio}>{radio}</label>
            </div>
          );
        })}
        </Form>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio('')}>Annuler recherche</h5>
        )}
      </div>

      <section className="row">
        {winesStock
          .filter((wine) => wine.type.includes(selectedRadio))
          .map((wine) => (
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="team-member" key={wine.id}>
                <Link
                  data-bs-toggle="modal"
                  to={`/edit-Selected-Wine/${wine.id}`}
                >
                  <img
                    className="mx-auto rounded-circle"
                    width="100"
                    height="100"
                    src={`http://localhost:8000/${wine.image}`}
                    alt={wine.name}
                  />
                </Link>

                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">{wine.name}</div>
                  <div className="portfolio-caption-heading">
                    {wine.vintage}
                  </div>
                  <div className="portfolio-caption-heading">{wine.type}</div>
                  <div className="portfolio-caption-subheading text-muted">
                    Quantity {wine.quantity}
                  </div>
                  {wine.quantity < 2 ? (
                    <img src={Red} width="10" alt="red circle" />
                  ) : (
                    <img src={Green} width="10" alt="green circle" />
                  )}
                  <input
                    type="number"
                    value={wine.quantity}
                    min="0"
                    onChange={(e) => setNewQuantity(e.target.value)}
                    onClick={() => handleQuantity(newQuantity, wine.id)}
                  />
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => handleDelete(wine.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default StockTake;
