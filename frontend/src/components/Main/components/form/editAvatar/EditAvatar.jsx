import { useState, useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      name="edit-avatar-form"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_url"
        name="link"
        id="edit-avatar-link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        ref={avatarRef}
      />
      <span className="edit-avatar-link-input-error popup__input-error"></span>
      <button className="button popup__button popup__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
