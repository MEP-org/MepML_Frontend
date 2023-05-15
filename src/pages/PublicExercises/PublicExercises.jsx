import {useState, useEffect} from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Results from './Results';
import {PublicAPI} from '../../api/PublicAPI';
import FadeIn from 'react-fade-in';

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
            <div className='container pt-12 pb-20'>
                <FadeIn>
                <Banner />
                <Filters filter={filter} setFilter={setFilter} profs={profs}/>
                <Results 
                    exercises={exercises} 
                    loading={loading} 
                    user={props.user} 
                    setFilter={setFilter} 
                    filter={filter} 
                    page={page}
                />
                </FadeIn>
            </div>
        </>
    )
}
