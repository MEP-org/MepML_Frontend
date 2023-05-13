import axios from 'axios';
import { API_URL } from './env';

// import publicExercices from './data/publicExercises.json'
import publicExercise from './data/publicExercises_id.json'

export const PublicAPI = {
    getPublicExercises: async function(filters) {

        if (filters.prof === 'all') delete filters.prof

        const response = await axios.get(`${API_URL}/publicexercises` , { params: filters });
        return response.data;
    },
    getPublicExercise: async function(exerciseId) {
        
        const response = await axios.get(`${API_URL}/publicexercises/${exerciseId}`);
        return response.data;
    }
}