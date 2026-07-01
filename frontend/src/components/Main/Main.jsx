import pencil from "../../images/pencil.svg";
import { useContext } from "react";
import NewCard from "./components/form/newCard/NewCard";
import EditProfile from "./components/form/editProfile/EditProfile";
import EditAvatar from "./components/form/editAvatar/EditAvatar";
import Popup from "../Popup/Popup";
import Card from "./components/Card/Card";
import api from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main(props) {
  const { onOpenPopup, cards, onCardLike, onCardDelete } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <div
            className="profile__edit-icon"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img
              alt="Edit Avatar"
              className="icon profile__edit-icon-img"
              src={pencil}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="card__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                handleOpenPopup={onOpenPopup}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
