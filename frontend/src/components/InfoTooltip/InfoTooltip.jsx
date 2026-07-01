import registrationSuccess from "../../images/registration-success.svg";
import registrationFail from "../../images/registration-fail.svg";
import "./InfoTooltip.css";

const InfoTooltip = ({ registerSuccess }) => {
  return (
    <>
      {registerSuccess ? (
        <div className="info-tooltip">
          <img
            alt="Registration Success"
            className="registration__status-icon"
            src={registrationSuccess}
          />
          <p className="registration__status-text">
            ¡Correcto! Ya estás registrado.
          </p>
        </div>
      ) : (
        <div className="info-tooltip">
          <img
            alt="Registration Fail"
            className="registration__status-icon"
            src={registrationFail}
          />
          <p className="registration__status-text">
            Uy, algo salió mal. Por favor, inténtalo de nuevo.
          </p>
        </div>
      )}
    </>
  );
};

export default InfoTooltip;
