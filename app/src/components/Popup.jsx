/* import React from "react";
import "./modal.css";

const Popup = ({ open, onClose, item }) => {
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
