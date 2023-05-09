import { useState, useEffect } from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import { StudentAPI } from '../../../api/StudentAPI';

export default function Assignments(){
    const studentId = 1;
    const [filter, setFilter] = useState({
        'title': '',
        'deadline': 'all',
        'filter': 'all',
        'sort': 'recent'
    });

    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoading(true);
        
        StudentAPI.getAssignments(studentId)
        .then((data) => {
            setAssignments(data.assignments)
            setClasses(data.classes)
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
                <Filters filter={filter} setFilter={setFilter} assignments={assignments} classes={classes}/>
                <div className='mb-10' />
                <Results assignments={assignments} loading={loading} filter={filter}/>
            </div>
        </>
    )
}
