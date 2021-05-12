import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
    return (
        <section className={`popup popup_big-window-picture ${isOpen && "popup_opened"}`}>
            <div className="popup__picture-wrapper">
                <button className="popup__close-button popup__close-button_window" aria-label="Закрыть" type="button" onClick={onClose}></button>
                <img className="popup__picture" src={card.link} alt={`${card.name}`} />
                <p className="popup__picture-text">{card.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;