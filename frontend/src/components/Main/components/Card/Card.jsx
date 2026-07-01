import ImagePopup from "../ImagePopup/ImagePopup";

function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;

  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };

  // Verifica si el usuario actual le ha dado "like" a la tarjeta
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(props.card);
  }

  function handleDeleteClick() {
    onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => {
          handleOpenPopup(imageComponent);
        }}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={() => handleDeleteClick()}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={cardLikeButtonClassName}
          type="button"
          onClick={() => handleLikeClick()}
        ></button>
      </div>
    </li>
  );
}

export default Card;
