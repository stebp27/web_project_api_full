import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

const Register = ({ handleRegistration }) => {
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
    handleRegistration(data);
  };

  const hasErrors = () => {
    return (
      Object.values(error).some((e) => e !== "") ||
      Object.values(data).some((d) => d === "")
    );
  };

  return (
    <div className="register">
      <div className="login__content">
        <h1 className="register__title">Regístrate</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            required
            value={data.email}
            onChange={handleChange}
          />
          {error.email && (
            <span className="register__error">{error.email}</span>
          )}
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
            <span className="register__error">{error.password}</span>
          )}
          <div className="register__button-container">
            <button
              type="submit"
              className="register__submit"
              disabled={hasErrors()}
            >
              Regístrate
            </button>
          </div>
        </form>

        <div className="register__signin">
          <p>
            ¿Ya eres miembro?{" "}
            <Link to="/signin" className="signin__link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
