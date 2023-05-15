import { useEffect, useState, useContext } from "react"
import { MySession } from '../../../main.jsx';
import Banner from './Banner';
import MyClasses from './MyClasses';
import { ProfessorAPI } from '../../../api/ProfessorAPI';

export default function Classes(){
    const { session } = useContext(MySession);
    const profId = session.user.id;

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
            <div className='container pt-12 pb-20'>
                <Banner />
                <div className='h-12'></div>
                <MyClasses classes={classes} loading={loading} />
            </div>
        </>
    )
}
