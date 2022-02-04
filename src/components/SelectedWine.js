import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './selectedWine.css';

const SelectedWine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState({});
  const [wineMatch, setWineMatch] = useState([]);
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

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
      <div className="container">
        <div className="card">
          <div className="card-header">
            <img
              width="200"
              src={`http://localhost:8000/${wine.image}`}
              alt={wine.name}
            />
          </div>
          <div class="card-body">
            <span class="tag tag-teal" onClick={handleToggle}>
              WineMatch
            </span>
            <h4>{wine.name}</h4>
            <p>Selected {wine.type}</p>
            <p> Vintage : {wine.vintage}</p>
            <p>Stock : {wine.quantity} btls</p>
          </div>
          <h2>************</h2>
          <div>
            {isActive && (
              <>
                <div class="user">
                  <img
                    src="https://media-exp1.licdn.com/dms/image/C5603AQFmHcfeCaLOig/profile-displayphoto-shrink_200_200/0/1580748741484?e=1649289600&v=beta&t=tDOj06kWQm8EmY6psLUxR-PSY1pxiDKuBw8SojtS21I"
                    alt="user"
                  />

                  <div className="user-info">
                    <h5>
                      {wineMatch.name} goes well with {wineMatch.dishName} as a{' '}
                      {wineMatch.type}
                    </h5>
                  </div>
                </div>
                <h2>************</h2>
              </>
            )}
          </div>
        </div>
        <div className="control">
          <Link to="/">Back to wine cellar</Link>
          <p className="btn">modify</p>
        </div>
      </div>
    </>
  );
};

export default SelectedWine;
