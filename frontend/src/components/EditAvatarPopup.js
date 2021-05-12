import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="download-avatar"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <div className="popup__input-warapper">
        <input 
        ref={avatarRef}
        type="url" 
        name="link" 
        id="link" 
        className="popup__formfield-input popup__formfield-input_avatar" 
        placeholder="Ссылка на картинку" 
        required />
        <span 
        id="place-avatar-error" className="error" />
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;