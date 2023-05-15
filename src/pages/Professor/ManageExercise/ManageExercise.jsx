import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { MySession } from '../../../main.jsx';

import { ProfessorAPI } from "../../../api/ProfessorAPI"
import Banner from "./Banner"
import ExercisesTab from "./ExercisesTab"

export default function ManageExercise(props){
    const { session } = useContext(MySession);
    const profId = session.user.id

    const id = useParams().id || undefined
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [metrics, setMetrics] = useState([])
    const [exercise, setExercise] = useState({
        id: undefined,
        title: '',
        subtitle: '',
        publish_date: '',
        description: '# Description',
        evaluation: '# Evaluation Rules',
        deadline: '',
        students_class: '',
        limit_of_attempts: '',
        visibility: false,
        dataset: {
            training: undefined,
            test: undefined
        },
        results: [],
        metrics: []
    })

    const [results, setResutls] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExercise((prevExercise) => ({ ...prevExercise, [name]: value }));
    };

    useEffect(() => {
        setLoading(true)
        ProfessorAPI.getMetricsClasses(profId).then((data) => {
            setClasses(data.classes)
            setMetrics(data.metrics)
        })
        .finally(() => {
            setLoading(false)
        })

        if (id !== undefined) {
            setLoading(true)
            ProfessorAPI.getExercise(profId, id).then((data) => {
                setExercise(data.exercise)
                setResutls(data.results)
            })
            .finally(() => {
                setLoading(false)
            })
        }   
    }, [id])


    return (
        <>
            <div className="container pt-12 pb-20">
                <Banner 
                    exercise={exercise} 
                    loading={loading} 
                    profId={profId}
                />
                <div className="h-8"></div>
                <ExercisesTab 
                    exercise={exercise} 
                    classes={classes}
                    metrics={metrics}
                    results={results}
                    handleChange={handleChange} 
                    loading={loading} 
                    setExercise={setExercise}
                />
            </div>
            
        </>
    )
}