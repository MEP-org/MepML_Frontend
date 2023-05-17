import axios from 'axios';
import { API_URL } from './env';

export const ProfessorAPI = {

    getClass: async function(profId, classId) {

        const response = await axios.get(`${API_URL}/professors/${profId}/classes/${classId}`)
        .catch((error) => {
            console.log("Error while fetching classes");
        });
        if (response.data.image) {
            response.data.image = `${API_URL}${response.data.image}`;
        }
        else {
            response.data.image = `https://flowbite.com/docs/images/carousel/carousel-1.svg`;
        }

        return response.data;
    },

    getStudentsByNmecs: async function(nmecs) {

        const response = await axios.get(`${API_URL}/users?nmecs=${nmecs.join(',')}`)
        .catch((error) => {
            console.log("Error while fetching students");
        });
        return response.data;
    },

    createClass: async function(profId, classData) {

        classData.students = classData.students.map((student) => student.id);
        classData.image = classData.newImage;
        const formData = new FormData();
        Object.keys(classData).forEach((key) => {
            if (key === 'students') return;
            if (classData[key] === undefined) return;
            formData.append(key, classData[key]);
        });
        classData.students.forEach((metricId) => {
            formData.append('students', metricId);
        });

        const response = await axios.post(`${API_URL}/professors/${profId}/classes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while creating class");
        });
    },

    updateClass: async function(profId, classId, classData) {

        classData.students = classData.students.map((student) => student.id);
        classData.image = classData.newImage;
        const formData = new FormData();
        Object.keys(classData).forEach((key) => {
            if (key === 'students') return;
            if (classData[key] === undefined) return;
            formData.append(key, classData[key]);
        });
        classData.students.forEach((metricId) => {
            formData.append('students', metricId);
        });

        const response = await axios.put(`${API_URL}/professors/${profId}/classes/${classId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while updating class");
        });
    },

    deleteClass: async function(profId, classId) {
            
        const response = await axios.delete(`${API_URL}/professors/${profId}/classes/${classId}`)
        .catch((error) => {
            console.log("Error while deleting class");
        });
    },


    getClasses: async function(profId) {

        const response = await axios.get(`${API_URL}/professors/${profId}/classes`)
        .catch((error) => {
            console.log("Error while fetching classes");
        });

        return response.data;
    },


    getExercise: async function(profId, exerciseId) {

        
        const response = await axios.get(`${API_URL}/professors/${profId}/exercises/${exerciseId}`)
        .catch((error) => {
            console.log("Error while fetching exercise");
        });
        if (response.data.exercise.limit_of_attempts === null) { response.data.exercise.limit_of_attempts = undefined; }
        return response.data;
    },

    createExercise: async function(profId, exerciseData) {

        exerciseData.metrics = exerciseData.metrics.map((metric) => metric.id)
        exerciseData.students_class = exerciseData.students_class.id;
        exerciseData.train_dataset = exerciseData.dataset.training;
        exerciseData.test_dataset = exerciseData.dataset.test;
        if (exerciseData.deadline === '') exerciseData.deadline = (new Date()).toISOString().split('T')[0];

        const formData = new FormData();
        Object.keys(exerciseData).forEach((key) => {
            if (key === 'metrics') return;
            formData.append(key, exerciseData[key]);
        });
        exerciseData.metrics.forEach((metricId) => {
            formData.append('metrics', metricId);
        });

        const response = await axios.post(`${API_URL}/professors/${profId}/exercises`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while creating exercise");
        });

    },

    updateExercise: async function(profId, exerciseId, exerciseData) {

        exerciseData.metrics = exerciseData.metrics.map((metric) => metric.id)
        exerciseData.students_class = exerciseData.students_class.id;
        exerciseData.train_dataset = exerciseData.dataset.training;
        exerciseData.test_dataset = exerciseData.dataset.test;
        exerciseData.deadline = exerciseData.deadline.split(' ')[0].split('/').reverse().join('-');
        delete exerciseData.created_by;
        delete exerciseData.dataset;

        const formData = new FormData();
        Object.keys(exerciseData).forEach((key) => {
            if (key === 'metrics') return;
            if (exerciseData[key] === undefined) return;
            formData.append(key, exerciseData[key]);
        });
        exerciseData.metrics.forEach((metricId) => {
            formData.append('metrics', metricId);
        });

        const response = await axios.put(`${API_URL}/professors/${profId}/exercises/${exerciseId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while updating exercise");
        });

    },

    deleteExercise: async function(profId, exerciseId) {

        const response = await axios.delete(`${API_URL}/professors/${profId}/exercises/${exerciseId}`)
        .catch((error) => {
            console.log("Error while deleting exercise");
        });
    },


    getExercises: async function(profId) {

        const response = await axios.get(`${API_URL}/professors/${profId}/exercises`)
        .catch((error) => {
            console.log("Error while fetching exercises");
        });

        return response.data;
    },


    getMetrics: async function(profId) {

        const response = await axios.get(`${API_URL}/professors/${profId}/metrics`)
        .catch((error) => {
            console.log("Error while fetching metrics");
        });

        return response.data;
    },

    
    getMetricsClasses: async function(profId) {

        const response = await axios.get(`${API_URL}/professors/${profId}/metricsclasses`)
        .catch((error) => {
            console.log("Error while fetching metrics and classes");
        });

        return response.data;
    },


    addMetric: async function(profId, payload) {

        const response = await axios.post(`${API_URL}/professors/${profId}/metrics`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while creating metric");
        });

        return response;
    },


    deleteMetric: async function(profId, metricId) {

        const response = await axios.delete(`${API_URL}/professors/${profId}/metrics/${metricId}`)
        .catch((error) => {
            console.log("Error while deleting metric");
        });
    },
}