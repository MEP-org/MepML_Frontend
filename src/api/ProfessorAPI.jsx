import class_ from './data/professors_id_classes_id.json'
import classes from './data/professors_id_classes.json'
import exercise from './data/professors_id_exercises_id.json'
import exercises from './data/professors_id_exercises.json'
import metrics from './data/professors_id_metrics.json'
import metricsClasses from './data/professors_id_metricsClasses.json'

export const ProfessorAPI = {
    getClass: async function(profId, classId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return class_;
    },
    getClasses: async function(profId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return classes;
    },
    getExercise: async function(profId, exerciseId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return exercise;
    },
    getExercises: async function(profId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return exercises;
    },
    getMetrics: async function(profId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return metrics;
    },
    getMetricsClasses: async function(profId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return metricsClasses;
    }
}