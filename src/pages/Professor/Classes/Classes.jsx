import { useEffect, useState } from "react"
import Banner from './Banner';
import MyClasses from './MyClasses';
import { ProfessorAPI } from '../../../api/ProfessorAPI';

export default function Classes(){
    const profId = 1;

    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoading(true);
        ProfessorAPI.getClasses(profId)
        .then((data) => { setClasses(data) })
        .finally(() => { setLoading(false) })
    }, []);

    return (
        <>
            <div className='container py-10'>
                <Banner />
                <div className='h-8'></div>
                <MyClasses classes={classes} loading={loading} />
            </div>
        </>
    )
}
