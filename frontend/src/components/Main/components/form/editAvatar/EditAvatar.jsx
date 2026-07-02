import { useState, useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    avatar: currentUser.avatar,
  });
  const [error, setError] = useState({
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevErr) => ({ ...prevErr, [name]: e.target.validationMessage }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar(data);
  }

  const hasErrors = () => {
    return (
      Object.values(error).some((e) => e !== "") ||
      Object.values(data).some((d) => d === "")
    );
  };

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
        name="avatar"
        id="edit-avatar-link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={data.avatar}
        onChange={handleChange}
      />
      {error.avatar && (
        <span className="edit-avatar-link-input-error popup__input-error">
          {error.avatar}
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

export default EditAvatar;
