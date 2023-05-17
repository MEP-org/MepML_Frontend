import axios from 'axios';
import { API_URL } from './env';

export const AuthAPI = {


    register: async function(form) {

        console.log(form);

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('nmec', form.nMec);
        formData.append('email', form.email);
        formData.append('user_type', form.userType);
        formData.append('password', form.password);

        const response = await axios.post(`${API_URL}/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while registering");
            return error.response;
        });

        return response.data;
    },


    login: async function(form) {

        const formData = new FormData();
        formData.append('email', form.email);
        formData.append('password', form.password);

        const response = await axios.post(`${API_URL}/signin`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while logging in");
            return { error: "Invalid credentials" };
        });

        return response.data;
    },


    getSession: async function(token) {

        const formData = new FormData();
        formData.append('token', token);

        const response = await axios.post(`${API_URL}/tokentosession`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while getting session");
        });

        return response.data;
    }
}