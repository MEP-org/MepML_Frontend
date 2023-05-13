import React, { useEffect, useState } from "react"
import { useParams, useLocation } from 'react-router-dom';
import AssignmentTab from "./AssignmentTab";
import { StudentAPI } from '../../../api/StudentAPI';
import Banner from "./Banner";


export default function Assignment(){

    const { id } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState({});
    const [submission, setSubmission] = useState({});
    const [results, setResults] = useState([]);
    const studentId = 1;


    useEffect(() => {
        setLoading(true);

        StudentAPI.getAssignment(studentId, id)
        .then((data) => {
            setAssignment(data.assignment);
            setSubmission(data.submission);
            setResults(data.all_results);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [location]);

    
    return (
        <>
            <div className='w-full container mt-8'>
                <Banner exercise={assignment.exercise || {}} loading={loading} />
                <AssignmentTab assignment={assignment} submission={submission} results={results} loading={loading} />
            </div>
        </>
    )
}
