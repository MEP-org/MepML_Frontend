import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import AssignmentTab from "./AssignmentTab";
import { ExercisesAPI } from "../../../api/ExercisesAPI";
import Banner from "./Banner";
import { Assignment as AssignmentInit } from "../../../model/Assignment";


export default function Assignment(){

    const { assignmentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState(AssignmentInit);


    useEffect(() => {
        setLoading(true);
        ExercisesAPI.getAssignmentById(assignmentId)
        .then((data) => {
            setAssignment(data);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    
    return (
        <>
            <div className='w-full container mt-8'>
                <Banner assignment={assignment} loading={loading} />
                <AssignmentTab assignment={assignment} loading={loading} />
            </div>
        </>
    )
}
