import tooltipSuccess from "../../images/tooltip-success.svg";
import tooltipFail from "../../images/tooltip-fail.svg";
import "./InfoTooltip.css";

const InfoTooltip = ({ status }) => {
  return (
    <>
      <div className="info-tooltip">
        <img
          alt="Registration Success"
          className="registration__status-icon"
          src={status.isSuccess ? tooltipSuccess : tooltipFail}
        />
        <p className="registration__status-text">{status.message}</p>
      </div>
    </>
  );
};

export default InfoTooltip;
