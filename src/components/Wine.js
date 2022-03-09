import React from 'react';
import { Link } from 'react-router-dom';

const Wine = ({ id, image, name, vintage, type,value, handleDelete,handleQuantity}) => {
  return (
    <div className="wineContainer" key={id}>
      <div>
        <img width="200" src={`${process.env.REACT_APP_API_URL}/${image}`} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <h3>{vintage}</h3>
        <h3>{type} Wine</h3>
        <input
          type="number"
          min="0"
          value={value}
          onChange={handleQuantity}
        />
        <Link to={`/edit-Selected-Wine/${id}`}>Edit</Link>
        <button type="button" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Wine;
