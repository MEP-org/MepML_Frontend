import {useState, useEffect} from 'react';
import {ExercisesAPI} from "../../api/ExercisesAPI";
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';


export default function PublicExercises(props){

    const [filter, setFilter] = useState({
        'title': '',
        'minSize': 0,
        'maxSize': 100000,
        'prof': 'all',
        'sort': 'recent'
    });

    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        setLoading(true);
        ExercisesAPI.getPublic()
        .then((data) => {
            setExercises(data);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [filter]);

    const profs = []

    return (
        <>
            <div className='container py-8'>
                <Banner />
                <div className='mb-10' />
                <Filters filter={filter} setFilter={setFilter} profs={profs}/>
                <div className='mb-10' />
                <Results exercises={exercises} loading={loading} />
            </div>
        </>
    )
}
