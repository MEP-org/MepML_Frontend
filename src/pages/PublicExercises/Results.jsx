import { Spinner } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import ExerciseCard from './ExerciseCard';

export default function Results(props){

    const {exercises, loading} = props;

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
                <div className=' font-bold text-xl text-center'>
                    No results found
                </div>
            </>
        )
    }

    const renderExercises = () => {
        if(exercises.length === 0){
            return noResults();
        }
        return (
            <>
                <div className='grid lg:grid-cols-2 gap-4'>
                    {exercises.map((exercise) => {
                        return (
                            <ExerciseCard exercise={exercise} key={exercise.id} user={props.user} />
                        )
                    })}
                </div>
            </>
        )
    }


    return (
        <>
            <div >
                <div className='font-semibold text-3xl mb-10 flex items-center'>
                    <FaFileAlt className='mr-2' size={25} />
                    Public Exercises
                </div>
            </div>
            {loading ? renderLoading() : renderExercises()}
        </>
    )
}
