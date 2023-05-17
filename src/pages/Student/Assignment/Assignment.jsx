import React, { useEffect, useState, useContext, useRef } from "react"
import { useParams, useLocation } from 'react-router-dom';
import { MySession } from '../../../main.jsx';
import AssignmentTab from "./AssignmentTab";
import { StudentAPI } from '../../../api/StudentAPI';
import Banner from "./Banner";
import FadeIn from 'react-fade-in';


export default function Assignment(){

    const { id } = useParams();
    const { session } = useContext(MySession);
    const studentId = session.user.id;
    const location = useLocation();
    const tabsRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState({});
    const [submission, setSubmission] = useState({});
    const [results, setResults] = useState([]);

    const hash2index = {
        '#description': 0,
        '#evaluation': 1,
        '#datasets': 2,
        '#results': 3,
        '#submission': 4
    }


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
        tabsRef.current.setActiveTab(hash2index[location.hash] || 0)
    }, [location]);

    
    return (
        <>
            <FadeIn className='w-full container mt-12 mb-20'>
                <Banner exercise={assignment.exercise || {}} submission={submission} loading={loading} />
                <AssignmentTab assignment={assignment} submission={submission} results={results} loading={loading} tabsRef={tabsRef} />
            </FadeIn>
        </>
    )
}
