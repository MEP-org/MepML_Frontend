import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import MyNavbar from '../components/MyNavbar'

import Home from '../pages/Home/Home';

import AuthPage from '../pages/Authentication/AuthPage';
import SignIn from "../pages/Authentication/SignIn";
import Signup from "../pages/Authentication/SignUp";

import StudentHome from '../pages/Student/Home/Home.jsx'
import StudentAssignments from '../pages/Student/Assignments/Assignments.jsx'
import StudentAssignment from '../pages/Student/Assignment/Assignment.jsx'
import StudentClass from '../pages/Student/Class/Class.jsx'

import PublicExercise from '../pages/PublicExercise/PublicExercise.jsx'
import PublicExercises from '../pages/PublicExercises/PublicExercises';

import ProfHome from '../pages/Professor/Classes/Classes.jsx'
import ProfManageClass from '../pages/Professor/ManageClass/ManageClass.jsx'
import ProfExercises from '../pages/Professor/Exercises/Exercises.jsx'
import ProfManageExercise from '../pages/Professor/ManageExercise/ManageExercise.jsx'
import ProfMetrics from '../pages/Professor/Metrics/Metrics.jsx'

import Error from '../pages/Error/Error.jsx'

export default function Router(){

    const router = createBrowserRouter(
        [
            { path: "/", element: <Home /> },
            { 
                path: "/auth", element: <AuthPage />,
                children: [
                    { index: true, element: <Navigate to="/auth/signin" /> },
                    { path: "signin", element: <SignIn /> },
                    { path: "signup", element: <Signup /> },
                ]
            },
            {
                path: "/student", element: <MyNavbar />,
                children: [
                    { index: true, element: <Navigate to="/student/home" /> },
                    { path: "home", element: <StudentHome /> },
                    { path: "publicExercises", element: <PublicExercises user='student'/> },
                    { path: "assignments", element: <StudentAssignments /> },
                    { path: "assignments/:id", element: <StudentAssignment /> },
                    { path: "publicExercises/:id", element: <PublicExercise /> },
                    { path: "classes/:id", element: <StudentClass /> },
                ]
            },
            {
                path: "/professor", element: <MyNavbar />,
                children: [
                    { index: true, element: <Navigate to="/professor/classes" /> },
                    { path: "classes", element: <ProfHome /> },
                    { path: "classes/add", element: <ProfManageClass /> },
                    { path: "classes/:id", element: <ProfManageClass /> },
                    { path: "publicExercises", element: <PublicExercises user='professor'/> },
                    { path: "publicExercises/:id", element: <PublicExercise /> },
                    { path: "exercises", element: <ProfExercises /> },
                    { path: "exercises/add", element: <ProfManageExercise />},
                    { path: "exercises/:id", element: <ProfManageExercise />},
                    { path: "metrics", element: <ProfMetrics /> },
                ]
            },
            { path: "*", element: <Error /> },
        ]
    )

    return (
        <RouterProvider router={router}/>
    )
}