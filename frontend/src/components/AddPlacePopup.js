import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangePlace(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="initial-cards-window"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-warapper">
        <input
          id="place-input"
          type="text"
          name="place-input"
          className="popup__formfield-input popup__formfield-input_place"
          placeholder="Место"
          minLength={2}
          maxLength={30}
          required
          onChange={handleChangePlace}
          value={name} />
        <span id="place-input-error" className="error" />
      </div>
      <div className="popup__input-warapper">
        <input
          type="url"
          name="link"
          id="link"
          className="popup__formfield-input popup__formfield-input_link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeLink}
          value={link} />
        <span id="place-link-error" className="error" />
      </div>
    </PopupWithForm>
  )

}

export default AddPlacePopup;