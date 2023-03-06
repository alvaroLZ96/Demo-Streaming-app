import React from "react";
import "./modal.css";

const Popup = ({ open, onClose, items }) => {
  {
    open && (
      <div className="popupContainer" onClick={onClose}>
        <div className="popupbody" onClick={(e) => e.stopPropagation()}>
          <div className="popupHeader">
            <button onClick={onClose}>X</button>
          </div>
          <div className="popupContent">
            {items.map((pop) => {
              return (
                <div key={pop.title} className="popupCard">
                  <h3>Name: {pop.title}</h3>
                  <p>Description:{pop.description}</p>
                  <p>Release Year:{pop.releaseYear}</p>
                  <img src={pop.images["Poster Art"].url} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default Popup;
