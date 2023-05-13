import axios from 'axios';
import { API_URL } from './env';

import class_ from './data/students_id_classes_id.json'
import classes from './data/students_id_classes.json'
import assignment from './data/students_id_assignments_id.json'
import assignments from './data/students_id_assignments.json'
import home from './data/students_id_home.json'


export const StudentAPI = {


    getClass: async function(studentId, classId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return class_;
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

        await axios.post(`${API_URL}/students/${studentId}/assignments/${exerciseId}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log("Error while posting submission: ");
        });
    }
}