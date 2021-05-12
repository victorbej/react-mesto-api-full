import React from 'react';

function PopupWithForm({name, title, button, children, isOpen, onClose, onSubmit}) {
    return (
        <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
            <form className={`popup__formfield popup__formfield_${name}`} name={name} onSubmit={onSubmit} noValidate>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className={`popup__save-button popup__save-button_${name}`} type="submit">{button}</button>
            </form>
        </section>
    );
}

export default PopupWithForm;