import {useState, useEffect} from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import {PublicAPI} from '../../api/PublicAPI';

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
    const [profs, setProfs] = useState([]);

    useEffect(() => {
        setLoading(true);
        PublicAPI.getPublicExercises(filter)
        .then((data) => { 
            setExercises(data.results.exercises)
            setProfs(data.results.professors)
        })
        .finally(() => { setLoading(false) })
    }, [filter]);

    return (
        <>
            <div className='container py-8'>
                <Banner />
                <div className='mb-10' />
                <Filters filter={filter} setFilter={setFilter} profs={profs}/>
                <div className='mb-10' />
                <Results exercises={exercises} loading={loading} user={props.user} />
            </div>
        </>
    )
}
