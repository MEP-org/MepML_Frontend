import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import { ProfessorAPI } from "../../../api/ProfessorAPI";

export default function Bannner(props) {

    const {exercise, loading, profId} = props
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (loading) return;
        if (exercise.id) {
            ProfessorAPI.updateExercise(profId, exercise.id, exercise)
            .finally(() => { navigate('/professor/exercises') })
        }
        else {
            ProfessorAPI.createExercise(profId, exercise)
            .finally(() => { navigate('/professor/exercises') })
        }
    }

    const handleDelete = () => {
        if (loading) return;
        ProfessorAPI.deleteExercise(profId, exercise.id)
        .finally(() => { navigate('/professor/exercises') })
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                    <div className="font-bold text-4xl">
                        {exercise.id ? 
                            'View/Edit Exercise' : 
                            'Create new Exercise'
                        }
                        {exercise.id !== undefined &&
                        <div className="inline-block cursor-pointer text-red-700 hover:text-red-500 ml-2">
                            <FaTrash size={32} onClick={handleDelete}/>
                        </div>
                    }
                    </div>
                    <div className="mt-2">
                        Exercises are used to train students on a specific topic or skill.
                        <br/>
                        You can create a new exercise or edit an existing one.
                    </div>
                </div>
                
            
                <div className="flex justify-end items-end">
                    <Button onClick={handleSubmit} className='w-36'>
                        {exercise.id ? 'Save' : 'Create'}
                    </Button>
                    <div className="w-4"/>
                    <Button color='light' onClick={() => navigate('/professor/exercises')} className='w-36'>
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}