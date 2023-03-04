class TokenService {
    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static removeToken() {
        localStorage.removeItem('token');
    }

    static hasToken() {
        return !!localStorage.getItem('token');
    }
}

export default TokenService;
