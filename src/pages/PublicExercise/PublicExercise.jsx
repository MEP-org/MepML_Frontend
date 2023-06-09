import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import PublicExerciseTab from "./PublicExerciseTab";
import Banner from "./Banner";
import { PublicAPI } from "../../api/PublicAPI";
import FadeIn from 'react-fade-in';


export default function PublicExercise(){

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [publicExercise, setPublicExercise] = useState({});


    useEffect(() => {
        setLoading(true);
        PublicAPI.getPublicExercise(id)
        .then((data) => {
            setLoading(false);
            setPublicExercise(data);
        })
        .finally(() => { setLoading(false) })
    }, []);

    
    return (
        <>
            <div className='w-full container mt-12 mb-20'>
                <FadeIn>
                <Banner exercise={publicExercise} loading={loading} />
                <PublicExerciseTab exercise={publicExercise} loading={loading} />
                </FadeIn>
            </div>
        </>
    )
}
