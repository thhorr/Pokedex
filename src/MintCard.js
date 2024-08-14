import React from 'react';

const MintCard = ({ title, description, imageUrl, buttonText, mintFunction }) => {

  return (
    <div className="card">
      <img src={imageUrl}/>
      <h2>{title}</h2>
      <div className="card-description">
      {description}
      </div>
      <div>
      <button onClick={mintFunction} disabled={!mintFunction}>
        {buttonText}
      </button>
      </div>
    </div>
  );
};

export default MintCard;
