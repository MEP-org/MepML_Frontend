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
