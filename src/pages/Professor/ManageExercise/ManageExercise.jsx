import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ExercisesAPI } from "../../../api/ExercisesAPI"
import { ClassesAPI } from "../../../api/ClassesAPI"

import Banner from "./Banner"
import ExercisesTab from "./ExercisesTab"

export default function ManageExercise(props){

    const id = useParams().id || undefined
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [metrics, setMetrics] = useState([])
    const [exercise, setExercise] = useState({
        id: id,
        title: undefined,
        subtitle: undefined,
        publishingDate: undefined,
        attemptsLimit: undefined,
        visible: false,
        studentClass: {id: undefined, name: undefined},
        description: undefined,
        evaluationRules: undefined,
        dataset: {training: undefined, test: undefined},
        results: []
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExercise((prevExercise) => ({ ...prevExercise, [name]: value }));
    };

    useEffect(() => {
        setLoading(true)
        const profId = 1
        if(id) {
            ExercisesAPI.getProfExerciseById(profId, id)
            .then((data) => {
                // setExercise(data.exercise)
                setClasses(data.classes)
            })
            .finally(() => {
                setLoading(false)
            })
        }
        else {
            ClassesAPI.getByProfessor(profId)
            .then((data) => {
                setClasses(data)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [id])


    return (
        <>
            <div className="container">
                <Banner 
                    exercise={exercise} 
                    loading={loading} 
                />
                <ExercisesTab 
                    exercise={exercise} 
                    classes={classes}
                    metrics={metrics}
                    handleChange={handleChange} 
                    loading={loading} 
                />
            </div>
            
        </>
    )
}