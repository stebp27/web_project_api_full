import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import * as auth from "../utils/auth";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { getToken, saveToken } from "../utils/tokens";
import Popup from "./Popup/Popup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userLogin, setUserLogin] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [token, setToken] = useState("");

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const infoTooltip = {
    children: <InfoTooltip registerSuccess={registerSuccess} />,
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .verifyToken(jwt)
      .then(({ data }) => {
        setToken(jwt);
        setIsLoggedIn(true);
        setUserLogin({ email: data.email });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        setRegisterSuccess(true);
        navigate("/signin");
      })
      .catch((e) => {
        setRegisterSuccess(false);
        console.error;
      });
  };

  // Used to wait for var change before displaying popup "InfoTooltip"
  useEffect(() => {
    if (registerSuccess !== null) {
      handleOpenPopup(infoTooltip);
    }
  }, [registerSuccess]);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          saveToken(res.token);
          setToken(res.token);
          setIsLoggedIn(true);

          auth
            .verifyToken(res.token)
            .then(({ data }) => {
              setIsLoggedIn(true);
              setUserLogin({ email: data.email });
              navigate("/");
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setUserAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((currentCard) => currentCard._id !== card._id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleAddPlaceSubmit(data) {
    await api.addPlace(data).then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    });
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <div className="page__content">
          <Header userLogin={userLogin} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <ProtectedRoute anonymous>
                  <Register handleRegistration={handleRegistration} />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signin"
              element={
                <ProtectedRoute anonymous>
                  <Login handleLogin={handleLogin} />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>
          <Footer />
          {popup && (
            <Popup onClose={handleClosePopup} title={popup.title}>
              {popup.children}
            </Popup>
          )}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
