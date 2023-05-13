import {useState, useEffect} from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import {PublicAPI} from '../../api/PublicAPI';

export default function PublicExercises(props){

    const [filter, setFilter] = useState({
        'title': '',
        'min_size': 0,
        'max_size': 100000,
        'prof': 'all',
        'sort': 'recent',
        'page': 1,
    });

    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [profs, setProfs] = useState([]);
    const [page, setPage] = useState({ 'current_page': 1, 'total_pages': 1 });

    useEffect(() => {
        setLoading(true);
        PublicAPI.getPublicExercises(filter)
        .then((data) => { 
            setExercises(data.results.exercises)
            setProfs(data.results.professors)
            setPage({ 'current_page': data.current_page, 'total_pages': data.total_pages })
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
                <Results 
                    exercises={exercises} 
                    loading={loading} 
                    user={props.user} 
                    setFilter={setFilter} 
                    filter={filter} 
                    page={page}/>
            </div>
        </>
    )
}
