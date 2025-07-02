import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isAdmin }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Replace with AuthContext in prod

  if (!user) return <Navigate to="/account" replace />; // Not logged in

  if (isAdmin && user.role !== "admin")
    return <Navigate to="/customer" replace />; // Not admin

  if (!isAdmin && user.role !== "customer") return <Navigate to="/" replace />; // Not customer

  return children;
};
