import axios from 'axios';
import { API_URL } from './env';

export const AuthAPI = {


    register: async function(formData) {

        const payload = {
            name: formData.name,
            nmec: formData.nMec,
            email: formData.email,
            user_type: formData.userType,
            password: formData.password
        }

        const response = await axios.post(`${API_URL}/signup}`, payload)
        .catch((error) => {
            console.log("Error while registering");
        });

        return response.data;
    },


    login: async function(formData) {

        const payload = {
            email: formData.email,
            password: formData.password
        }

        const response = await axios.post(`${API_URL}/signin}`, payload)
        .catch((error) => {
            console.log("Error while logging in");
        });

        return response.data;
    },


    getSession: async function(token) {

        const payload = {
            token: token
        }

        const response = await axios.post(`${API_URL}/tokentosession}`, payload)
        .catch((error) => {
            console.log("Error while getting session");
        });

        return response.data;
    }
}