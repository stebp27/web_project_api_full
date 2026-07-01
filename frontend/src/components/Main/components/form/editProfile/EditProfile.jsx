import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      name="edit-profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        name="name"
        id="edit-profile-name"
        placeholder="Nombre"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="edit-profile-name-input-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_description"
        name="description"
        id="edit-profile-description"
        placeholder="Acerca de mí"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="edit-profile-description-input-error popup__input-error"></span>
      <button className="button popup__button popup__submit" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
