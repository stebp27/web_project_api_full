import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: currentUser.name,
    about: currentUser.about,
  });
  const [error, setError] = useState({
    name: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevErr) => ({ ...prevErr, [name]: e.target.validationMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(data);
  };

  const hasErrors = () => {
    return (
      Object.values(error).some((e) => e !== "") ||
      Object.values(data).some((d) => d === "")
    );
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
        value={data.name}
        onChange={handleChange}
      />
      {error.name && (
        <span className="edit-profile-name-input-error popup__input-error">
          {error.name}
        </span>
      )}
      <input
        className="popup__input popup__input_type_description"
        name="about"
        id="edit-profile-description"
        placeholder="Acerca de mí"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={data.about}
        onChange={handleChange}
      />
      {error.about && (
        <span className="edit-profile-description-input-error popup__input-error">
          {error.about}
        </span>
      )}
      <button
        className="button popup__button popup__submit"
        type="submit"
        disabled={hasErrors()}
      >
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
