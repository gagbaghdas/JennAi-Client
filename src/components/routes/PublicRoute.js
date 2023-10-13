import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils';

export function PublicRoute({ children }) {
  const location = useLocation();

  // If authenticated, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  // Otherwise, render the child components (e.g., Login or Signup page)
  return children;
}
