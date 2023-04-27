import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import PublicExerciseTab from "./PublicExerciseTab";
import { ExercisesAPI } from "../../../api/ExercisesAPI";
import Banner from "./Banner";
import { PublicExercise as PublicExerciseInit } from "../../../model/PublicExercise";


export default function PublicExercise(){

    const { exerciseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [publicExercise, setPublicExercise] = useState(PublicExerciseInit);


    useEffect(() => {
        setLoading(true);
        ExercisesAPI.getPublicExerciseById(exerciseId)
        .then((data) => {
            setPublicExercise(data);
        })
        .finally(() => {
            setLoading(false);
        })
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
