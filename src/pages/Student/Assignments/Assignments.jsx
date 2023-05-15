import { useState, useEffect, useContext } from 'react';
import { MySession } from '../../../main.jsx';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import { StudentAPI } from '../../../api/StudentAPI';
import FadeIn from 'react-fade-in';

export default function Assignments(){

    const { session } = useContext(MySession);
    const studentId = session.user.id;
    
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
            <div className='container pt-12 pb-20'>
                <FadeIn>
                <Banner />
                <Filters filter={filter} setFilter={setFilter} assignments={assignments} classes={classes}/>
                <Results assignments={assignments} loading={loading} filter={filter}/>
                </FadeIn>
            </div>
        </>
    )
}
