import axios from 'axios';
import { API_URL } from './env';

export const StudentAPI = {


    getClass: async function(studentId, classId) {

        const response = await axios.get(`${API_URL}/students/${studentId}/classes/${classId}`)
        .catch((error) => {
            console.log("Error while fetching assignment");
        });
        if (response.data.image) {
            response.data.image = `${API_URL}${response.data.image}`;
        }
        else {
            response.data.image = `https://flowbite.com/docs/images/carousel/carousel-1.svg`;
        }

        return response.data;
    },


    getClasses: async function(studentId) {

        const response = await axios.get(`${API_URL}/students/${studentId}/classes`)
        .catch((error) => {
            console.log("Error while fetching assignment");
        });

        return response.data;
    },


    getAssignment: async function(studentId, assignmentId) {

        const response = await axios.get(`${API_URL}/students/${studentId}/assignments/${assignmentId}`)
        .catch((error) => {
            console.log("Error while fetching assignment");
        });

        return response.data;
    },


    getAssignments: async function(studentId) {

        const response = await axios.get(`${API_URL}/students/${studentId}/assignments`)
        .catch((error) => {
            console.log("Error while fetching assignments");
        });

        return response.data;
    },


    getHome: async function(studentId) {

        const response = await axios.get(`${API_URL}/students/${studentId}/home`)
        .catch((error) => {
            console.log("Error while fetching home stats");
        });

        return response.data;
    },


    postSubmission: async function(studentId, exerciseId, payload) {

        const response = await axios.post(`${API_URL}/students/${studentId}/assignments/${exerciseId}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .catch((error) => {
            console.log("Error while posting submission");
        });

        return response;
    }
}