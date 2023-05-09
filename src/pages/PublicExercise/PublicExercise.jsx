import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import PublicExerciseTab from "./PublicExerciseTab";
import Banner from "./Banner";
import { PublicAPI } from "../../api/PublicAPI";


export default function PublicExercise(){

    const { exerciseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [publicExercise, setPublicExercise] = useState({});


    useEffect(() => {
        setLoading(true);
        PublicAPI.getPublicExercise(exerciseId)
        .then((data) => {
            setLoading(false);
            setPublicExercise(data);
        })
        .finally(() => { setLoading(false) })
    }, []);

    
    return (
        <>
            <div className='w-full container mt-8'>
                <Banner exercise={publicExercise} loading={loading} />
                <PublicExerciseTab exercise={publicExercise} loading={loading} />
            </div>
        </>
    )
}
