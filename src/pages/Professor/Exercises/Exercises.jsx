import { useState, useEffect } from 'react'
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import { ProfessorAPI } from '../../../api/ProfessorAPI';

export default function Exercises(){
    const profId = 1;

    const [filter, setFilter] = useState({
        'title': '',
        'filter': 'all',
        'sort': 'recent'
    });

    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoading(true);
        ProfessorAPI.getExercises(profId)
        .then((data) => {
            setExercises(data.exercises)
            setClasses(data.classes)
        })
        .finally(() => { setLoading(false) })
    }, []);


    return (
        <>
            <div className='container py-8'>
                <Banner />
                <div className='mb-10' />
                <Filters filter={filter} setFilter={setFilter} classes={classes}/>
                <div className='mb-10' />
                <Results exercises={exercises} loading={loading} filter={filter}/>
            </div>
        </>
    )
}
