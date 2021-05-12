import React from "react";

function InfoTooltip({ isOpen, onClose, title, icon }) {
  return (
    <div
      className={`popup popup-tool ${isOpen && "popup_opened"}`}
      id="popup-toolTip"
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img src={icon} alt="Статус-лого" className="popup__tool-logo" />
        <h2 className="popup__heading popup__heading_small">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;