import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <div onClick={onEditAvatar} className="profile__image-edit">
                        <img src={currentUser.avatar} className="profile__image" alt="Фото исследователя" />
                    </div>
                </div>
                <div className="profile__name-button">
                    <div className="profile__wrapper">
                        <div className="profile__item-name">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" onClick={onEditProfile} className="profile__reduction-button"></button>
                        </div>
                        <p className="profile__text">{currentUser.about}</p>
                    </div>
                    <button type="button" onClick={onAddPlace} className="profile__add-button" />
                </div>
            </section>

            <section className="gallery">
                <ul className="gallery__lists">
                    {
                        cards.map(card => (
                            <Card
                                card={card}
                                onCardClick={onCardClick}
                                key={card._id}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        ))
                    }
                </ul>
            </section>

        </main>
    );
}

export default Main;