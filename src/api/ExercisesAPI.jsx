import { assignment, student_assignments, public_exercise, profExercises, public_exercises } from './data.json';

export const ExercisesAPI = {
    getByProf: async function(profId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return profExercises;
    },
    getByStudent: async function(studentId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return student_assignments;
    },
    
    getPublic: async function() {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return public_exercises;
    },

    getAssignmentById: async function(assignmentId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return assignment;
    },

    getPublicExerciseById: async function(exerciseId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return public_exercise;
    },

    getProfExerciseById: async function(profId, exerciseId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            "exercise": undefined,
            "classes": []
        }      
    },  
}