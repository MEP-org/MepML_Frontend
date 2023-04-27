import { Spinner } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import ExerciseCard from './ExerciseCard';

export default function Results(props){

    const {exercises, loading, filter} = props;

    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }

    const noResults = () => {
        return (
            <>
                <div className='font-bold text-xl text-center'>
                    No results found
                </div>
            </>
        )
    }

    const exercisesFilter = (exercise) => {
        // TODO: Implement filter
        console.log(filter, exercise);
        return true;
    }   

    const renderExercises = () => {
        let filteredExercises = exercises.filter(exercisesFilter);
        if(filteredExercises.length === 0){
            return noResults();
        }
        // TODO: Implement sort
        return (
            <>
                <div>
                    {filteredExercises.map((exercise) => {
                        return (
                            <ExerciseCard exercise={exercise} key={exercise.id} />
                        )
                    })}
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <div className='font-semibold text-3xl mb-10 flex items-center'>
                    <FaFileAlt className='mr-2' size={25} />
                    Exercises
                </div>
            </div>
            {loading ? renderLoading() : renderExercises()}
        </>
    )
}
