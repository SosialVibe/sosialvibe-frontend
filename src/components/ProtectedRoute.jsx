import { Navigate,useLocation } from "react-router-dom";

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function ProtectedRoute({ children }) {
  const isAuth = isAuthenticated();
  const location = useLocation();

  return isAuth ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export function AuthRoute({ children }) {
  const isAuth = isAuthenticated();
  const location = useLocation();

  return isAuth ? <Navigate to={location.state?.from?.pathname || "/"} replace /> : children;
}

