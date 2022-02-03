import React from 'react';

const WinePairing = ({ image,dishName,type }) => {
  return (
    <div>
      <img width="200" src={`http://localhost:8000/${image}`} alt="image" />
      <p>goes well with {dishName} as a {type}</p>
    </div>
  );
};

export default WinePairing;
