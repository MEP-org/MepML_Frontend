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
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return classes;
    },
    getAssignment: async function(studentId, assignmentId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return assignment;
    },
    getAssignments: async function(studentId) {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return assignments;
    },
    getHome: async function(studentId) {
       // add a delay to simulate a network request
       await new Promise((resolve) => setTimeout(resolve, 1000));
       return home; 
    }
}