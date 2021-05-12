import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`${isOwn ? 'gallery__delete-button' : 'gallery__delete-button_hidden'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikedButtonClassName = (`gallery__like-button${isLiked ? ' gallery__like-button_active' : ''}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="gallery__list">
            <img src={card.link} alt={`${card.name}`} onClick={handleClick} className="gallery__list-image" />
            <div className="gallery__list-wrapper">
                <h2 className="gallery__list-title">{card.name}</h2>
                <div className="gallery__likes-container">
                    <button type="button" className={cardLikedButtonClassName} onClick={handleLikeClick} />
                    <p className="gallery__likes-count">{card.likes.length}</p>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </li>
    )
}

export default Card;