import http from '../Http';

interface LoginForm {
    username: string;
    password: string
}

interface RegisterForm {
    username: string;
    password: string;
    confirmPassword: string
}

/**
 * Authentication RESTful requests
 */
class AuthAPI {
    /**
     * Login
     * POST Request
     * @param form
     */
    login = (form: LoginForm) => {
        return dispatch => {
            return new Promise((resolve, reject) => {
                http.post('/login', form)
                    .then(response => {
                        console.log(response.data);
                        resolve(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        }
    };


    /**
     * Register new User
     * POST Request
     * @param form
     */
    register = (form: RegisterForm) => {
        return dispatch => {
            return new Promise((resolve, reject) => {
                http.post('/register', form)
                    .then(response => {
                        console.log(response.data);
                        resolve(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        }
    }

}

export const authAPI = new AuthAPI();
