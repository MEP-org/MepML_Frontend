import { useState, useEffect, useContext } from 'react'
import { MySession } from '../../../main.jsx';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import { ProfessorAPI } from '../../../api/ProfessorAPI';
import FadeIn from 'react-fade-in';

export default function Exercises(){
    const { session } = useContext(MySession);
    const profId = session.user.id;

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
            <div className='container pt-12 pb-20'>
                <FadeIn>
                <Banner />
                <Filters filter={filter} setFilter={setFilter} classes={classes}/>
                <Results exercises={exercises} loading={loading} filter={filter}/>
                </FadeIn>
            </div>
        </>
    )
}
