import axios from 'axios';
import { API_URL } from './env';

export const PublicAPI = {
    getPublicExercises: async function(filters) {

        if (filters.prof === 'all') delete filters.prof

        const response = await axios.get(`${API_URL}/publicexercises` , { params: filters });
        return response.data;
    },


    getPublicExercise: async function(exerciseId) {

        const response = await axios.get(`${API_URL}/publicexercises/${exerciseId}`)
        .catch((error) => {
            console.log("Error while fetching public exercise");
        });

        return response.data;
    }
}