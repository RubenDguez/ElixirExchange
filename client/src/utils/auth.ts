import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  }

  loggedIn(): boolean {
    return localStorage.getItem('id_token') !== null
  }
  
  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;

    if (!decodedToken.exp) return false
    return decodedToken.exp < currentTime;
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();
