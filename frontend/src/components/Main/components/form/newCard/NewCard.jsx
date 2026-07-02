import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: "",
    link: "",
  });
  const [error, setError] = useState({
    name: "",
    link: "",
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
    handleAddPlaceSubmit(data);
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
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="name"
          maxLength="30"
          minLength="1"
          name="name"
          placeholder="Title"
          required
          type="text"
          value={data.name}
          onChange={handleChange}
        />
        {error.name && <span className="popup__input-error">{error.name}</span>}
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={data.link}
          onChange={handleChange}
        />
        {error.link && <span className="popup__input-error">{error.link}</span>}
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={hasErrors()}
      >
        Guardar
      </button>
    </form>
  );
}

export default NewCard;
