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

/* const Popup = ({ open, onClose, item }) => {
  if (!open) return null;
  console.log(item);
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <h3>Name: {item.title}</h3>
            <p>Description:{item.description}</p>
            <p>Release Year:{item.releaseYear}s</p>
            <img src={item.images["Poster Art"].url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
 */
