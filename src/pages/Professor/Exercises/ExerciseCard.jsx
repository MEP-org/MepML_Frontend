import { FaArrowRight, FaBook, FaGlobeAmericas } from "react-icons/fa";
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function ExerciseCard(props) {

    const {id, title, description, visible, maxAttempts, totalAnswers, maxAnswers, published, deadline, studentClass} = props.exercise;
    
    return ( 
        <>

            <Card className='mb-4 border-l-8 !border-l-blue-500'>
                <div className='grid grid-cols-12'>
                    <div className='lg:col-span-10 col-span-12'>
                        <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </p>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {description}
                        </p>
                    </div>

                    <div className='lg:col-span-2 col-span-10'>
                        <div className="text-gray-700 dark:text-gray-400 lg:text-right"> 
                            <span id="badge-dismiss-green" className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                <FaGlobeAmericas className='inline-block mr-2' size={12}  />
                                {visible ? 'Public' : 'Private'}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400 lg:text-right">
                            <FaBook className='inline-block mr-2' size={12}  />
                            <span className="inline-block text-xs font-light">
                                {studentClass.name}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400 lg:text-right">
                            <span className="inline-block text-xs font-light pr-1">Nº attempts</span>
                            <span className="inline-block text-xs font-bold">
                                {maxAttempts}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400 lg:text-right">
                            <span className="inline-block text-xs font-bold pr-1">
                                {totalAnswers}/{maxAnswers}
                            </span>
                            <span className="inline-block text-xs font-light pr-1"> Answers</span>
                        </div>
                    </div>

                </div>

                <div className="pt-5 mt-auto flex justify-between items-end">
                    <div>
                        <div className="text-gray-700 dark:text-gray-400">
                            <span className="inline-block text-xs font-light pr-1">Published at</span>
                            <span className="inline-block text-xs font-bold">
                                {published}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400">
                            <span className="inline-block text-xs font-light pr-1">Due to</span>
                            <span className="inline-block text-xs font-bold">
                                {deadline}
                            </span>
                        </div>
                    </div>

                    <Link to={`/professor/exercises/${id}`}>
                        <button className="my-btn h-11 w-11">
                            <FaArrowRight />
                        </button>
                    </Link>
                </div>
            </Card>

           





        </>
    )
}
