import { useState, useEffect } from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import { ExercisesAPI } from "../../../api/ExercisesAPI";
import AssignmentCard from './AssignmentCard';

export default function Assignments(){

    const [filter, setFilter] = useState({
        'title': '',
        'deadline': 'all',
        'filter': 'all',
        'sort': 'recent'
    });

    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        setLoading(true);
        const studentId = 1;
        ExercisesAPI.getByStudent(studentId)
        .then((data) => {
            setExercises(data);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);


    return (
        <>
            <div className='container py-8'>
                <Banner />
                <div className='mb-10' />
                <Filters filter={filter} setFilter={setFilter} exercises={exercises}/>
                <div className='mb-10' />
                <Results exercises={exercises} loading={loading} filter={filter}/>
            </div>
        </>
    )
}
