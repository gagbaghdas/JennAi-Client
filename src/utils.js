import * as CookieManager from './cookieManager';

export function isAuthenticated (){
    return CookieManager.getAccessToken() !== undefined || CookieManager.getRefreshToken() !== undefined;
};