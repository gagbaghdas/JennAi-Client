import Cookies from 'js-cookie';

export const setAccessToken = (token) => {
  Cookies.set('access_token', token, { path: '/' });
};

export const removeAccessToken = () => {
  Cookies.remove('access_token', { path: '/' });
};

export const getAccessToken = () => {
  return Cookies.get('access_token');
};

export const setRefreshToken = (token) => {
  Cookies.set('refresh_token', token, { path: '/' });
};

export const removeRefreshToken = () => {
  console.log("remove refresh token")
  Cookies.remove('refresh_token', { path: '/' });
};

export const getRefreshToken = () => {
  return Cookies.get('refresh_token');
};
