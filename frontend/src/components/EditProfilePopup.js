import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="reduction-window"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}
      >
      <div className="popup__input-warapper">
        <input id="name-input"
          type="text"
          name="name-input"
          className="popup__formfield-input popup__formfield-input_name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={name}
          onChange={handleChangeName}
        />
        <span id="name-input-error" className="error" />
      </div>
      <div className="popup__input-warapper">
        <input type="text"
          name="about"
          id="about"
          className="popup__formfield-input popup__formfield-input_job"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
          value={description}
          onChange={handleChangeDescription}
        />
        <span id="about-error" className="error" />
      </div>
    </PopupWithForm>
  )

}

export default EditProfilePopup;