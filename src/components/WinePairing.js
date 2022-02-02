import React from 'react';

const WinePairing = ({ image,name,type }) => {
  return (
    <div>
      <img width="200" src={`http://localhost:8000/${image}`} alt={name} />
      <p>goes well with {name} as a {type}</p>
    </div>
  );
};

export default WinePairing;
