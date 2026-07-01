import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
