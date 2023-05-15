import { Spinner, Pagination } from 'flowbite-react';
import { FaFileAlt } from 'react-icons/fa';
import ExerciseCard from './ExerciseCard';

export default function Results(props){

    const {exercises, loading, setFilter, filter, page} = props;

    const onPageChange = (page) => {
        setFilter({...filter, page: page});
    }


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
                <div className='grid lg:grid-cols-2 gap-6'>
                    {exercises.map((exercise) => {
                        return (
                            <ExerciseCard exercise={exercise} key={exercise.id} user={props.user} />
                        )
                    })}
                </div>
                <div className='mt-10 flex justify-center my-pages'>
                    <Pagination
                        currentPage={page.current_page}
                        onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={page.total_pages}
                    />
                </div>
            </>
        )
    }


    return (
        <>
            <div >
                <div className='font-semibold text-3xl mt-12 mb-5 flex items-center'>
                    <FaFileAlt className='mr-2' size={23} />
                    Public Exercises
                </div>
            </div>
            {loading ? renderLoading() : renderExercises()}
        </>
    )
}
