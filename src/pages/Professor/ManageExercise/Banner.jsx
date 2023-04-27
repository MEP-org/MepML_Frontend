import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Bannner(props) {

    const {exercise, loading} = props
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (loading) return;
        console.log(exercise)
        if (exercise.id) {
            console.log('edit exercise')
        }
        else {
            console.log('create exercise')
        }
        navigate('/professor/exercises')
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