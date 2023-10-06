import http from "../utills/http-client";

const login = (data) => {
    return http.post('/generate-token', data, {
        transformResponse: [(result) => {

            localStorage.setItem('authToken', result);
            return result;
        }]
    });
}

const register = (data) => {
    return http.post('user/', data);
}

const profile = () => {
    return http.get('/user');
}

const logout = () => {
    localStorage.removeItem('authToken');
    // return http.get('/logout', null, {
    //     transformResponse: [(result) => {
    //         localStorage.removeItem('authToken');
    //         return result;
    //     }]
    // });
}

const getAuthUser = () => {
    return localStorage.getItem('authToken');
}

const methods = {
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;