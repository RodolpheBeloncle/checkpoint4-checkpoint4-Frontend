import React from 'react';
import {Link} from 'react-router-dom'

const Wines = (props) => {
  const {wine} = props
  return (
    <div className="wines">
      <div className="wineContainer">
        <>
          <div>
            <img src={wine.image} className="image" alt={wine.name} />
          </div>
          <div>
            <h2>{wine.name}</h2>
            <h3>{wine.vintage}</h3>
            <h3>{wine.type} Wine</h3>
            <Link to={`/edit-Selected-Wine/${wine.id}`}>Edit</Link>
            <button type="button" onClick={() => handleDelete(wine.id)}>
              Supprimer
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Wines;
