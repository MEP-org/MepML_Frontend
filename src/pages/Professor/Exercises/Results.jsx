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
        if(filter.sort === 'recent'){
            return e1.publish_date < e2.publish_date;
        } else if(filter.sort === 'oldest'){
            return e1.publish_date > e2.publish_date;
        } else if(filter.sort === 'closestDeadline'){
            return e1.deadline < e2.deadline;
        } else if(filter.sort === 'farthestDeadline'){
            return e1.deadline > e2.deadline;
        }
    }


    const renderExercises = () => {
        const filteredExercises = exercises.filter(exercisesFilter).sort(sortExercises);
        if(filteredExercises.length === 0){
            return noResults();
        }
        return (
            <>
                <FadeIn>
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
