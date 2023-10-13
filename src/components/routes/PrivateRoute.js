import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils';

export function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
