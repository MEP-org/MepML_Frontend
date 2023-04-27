import { useEffect, useState } from "react"
import Banner from './Banner';
import MyClasses from './MyClasses';
import { ClassesAPI } from "../../../api/ClassesAPI";

export default function Classes(){

    const [loading, setLoading] = useState(false);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        setLoading(true);
        const profId = 1;
        ClassesAPI.getByProfessor(profId)
        .then((data) => {
            setClasses(data);
        })
        .finally(() => {
            setLoading(false);
        })
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
