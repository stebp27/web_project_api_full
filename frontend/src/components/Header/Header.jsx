import AppContext from "../../contexts/AppContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logo from "../../images/logo.svg";
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../../utils/tokens";

function Header({ userLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);

  function signOut() {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  }

  let headerLink = "";

  if (isLoggedIn) {
    headerLink = (
      <div className="header__logged_info">
        <p>{userLogin.email}</p>
        <button onClick={signOut} className="header__link header__button">
          Cerrar sesión
        </button>
      </div>
    );
  } else if (location.pathname === "/signup") {
    headerLink = (
      <Link to="/signin" className="header__link">
        Iniciar Sesión
      </Link>
    );
  } else {
    headerLink = (
      <Link to="/signup" className="header__link">
        Regístrate
      </Link>
    );
  }

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <div className="header__link">{headerLink}</div>
    </header>
  );
}

export default Header;
