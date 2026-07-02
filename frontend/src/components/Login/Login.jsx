import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
  };

  const hasErrors = () => {
    return (
      Object.values(error).some((e) => e !== "") ||
      Object.values(data).some((d) => d === "")
    );
  };

  return (
    <div className="login">
      <div className="login__content">
        <h1 className="login__title">Inicia sesión</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            required
            value={data.email}
            onChange={handleChange}
          />
          {error.email && <span className="login__error">{error.email}</span>}
          <input
            id="password"
            required
            placeholder="Contraseña"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
          {error.password && (
            <span className="login__error">{error.password}</span>
          )}
          <div className="login__button-container">
            <button
              type="submit"
              className="login__submit"
              disabled={hasErrors()}
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="login__signup">
          <p>
            ¿Aún no eres miembro?{" "}
            <Link to="/signup" className="signup__link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
