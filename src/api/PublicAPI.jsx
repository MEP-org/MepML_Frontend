import publicExercices from './data/publicExercises.json'
import publicExercise from './data/publicExercises_id.json'

export const PublicAPI = {
    getPublicExercises: async function(filters) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return publicExercices;
    },
    getPublicExercise: async function(exerciseId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return publicExercise;
    }
}