import { Link } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import ExerciseCard from './ExerciseCard';
import FadeIn from 'react-fade-in';

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
                <div className='text-xl text-center mt-16'>
                    You have not created any exercise yet
                    <br />
                    <Link to='/professor/exercises/add' className='text-blue-500 hover:underline'> Create one</Link>
                </div>
            </>
        )
    }

    const exercisesFilter = (exercise) => {
        return (
            exercise.title.toLowerCase().includes(filter.title.toLowerCase()) &&
            (filter.filter === 'all' || 
            (filter.filter == exercise.students_class.id))
        )
    }

    const sortExercises = (e1, e2) => {
        const date1 = new Date(e1.publish_date.split(' ')[0].split('/').reverse().join('-') + 'T' + e1.publish_date.split(' ')[1]);
        const date2 = new Date(e2.publish_date.split(' ')[0].split('/').reverse().join('-') + 'T' + e2.publish_date.split(' ')[1]);
        if(filter.sort === 'recent'){
            return date1 < date2;
        } else if(filter.sort === 'oldest'){
            return date1 > date2;
        }
    }


    const renderExercises = () => {
        const filteredExercises = exercises.filter(exercisesFilter).sort(sortExercises);
        if(filteredExercises.length === 0){
            return noResults();
        }
        return (
            <>
                <FadeIn className='grid grid-cols-2 gap-6'>
                    {filteredExercises.map((exercise) => {
                        return (
                            <ExerciseCard exercise={exercise} key={exercise.id} />
                        )
                    })}
                </FadeIn>
            </>
        )
    }

    return (
        <>
            <div>
                <div className='font-semibold text-3xl mt-12 mb-5 flex items-center'>
                    <FaFileAlt className='mr-2' size={23} />
                    Exercises
                </div>
            </div>
            {loading ? renderLoading() : renderExercises()}
        </>
    )
}
