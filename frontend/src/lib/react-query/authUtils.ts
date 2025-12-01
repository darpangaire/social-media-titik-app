import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


type JWTPayLoad = {
  exp: number;
  user_id?: string;
  username?: string;
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access');
  if (!token) return false;

  try {
  const decoded = jwtDecode<JWTPayLoad>(token as string);
    const isExpired = (decoded.exp || 0) * 1000 < Date.now();
    return !isExpired;
  } catch (error) {
    return false;
  }
}

export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  console.log('User logged out');
  // window.location.href = '/sign-in';

  
}


