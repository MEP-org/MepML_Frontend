import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import AssignmentTab from "./AssignmentTab";
import { StudentAPI } from '../../../api/StudentAPI';
import Banner from "./Banner";


export default function Assignment(){

    const { assignmentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState({});
    const [submission, setSubmission] = useState({});
    const [results, setResults] = useState({});
    const studentId = 1;


    useEffect(() => {
        setLoading(true);

        StudentAPI.getAssignment(studentId, assignmentId)
        .then((data) => {
            setAssignment(data.assignment);
            setSubmission(data.submission);
            setResults(data.all_results);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    
    return (
        <>
            <div className='w-full container mt-8'>
                <Banner exercise={assignment.exercise || {}} loading={loading} />
                <AssignmentTab assignment={assignment} submission={submission} results={results} loading={loading} />
            </div>
        </>
    )
}
