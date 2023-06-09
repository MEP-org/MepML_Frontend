import { FaArrowRight, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'flowbite-react';

export default function AssignmentCard(props){

    const navigate = useNavigate();
    const {assignment} = props;

    return (
        <>

        <Card className="border-l-8 !border-l-blue-500 hover:scale-105 transition-all duration-200 ease-in-out" onClick={() => {navigate("/student/assignments/" + assignment.id)}}>
            <div className="overflow-auto flex flex-col h-52">
                <div>
                    <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {assignment.title}
                    </p>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                        {assignment.subtitle}
                    </p>
                </div>


                <div className="mt-auto flex justify-between items-end overflow-hidden">
                    <div>
                        <div className="text-gray-700 dark:text-gray-400">
                            <FaBook className='inline-block mr-2' size={12}  />
                            <span className="inline-block text-xs font-light">
                                {assignment.students_class.name}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400">
                            <span className="inline-block text-xs font-light pr-1">Published at</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.publish_date}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-400">
                            <span className="inline-block text-xs font-light pr-1">Due to</span>
                            <span className="inline-block text-xs font-bold">
                                {assignment.deadline}
                            </span>
                        </div>
                    </div>

                    <Button className="!p-0 !h-11 !w-11" onClick={() => {navigate("/student/assignments/" + assignment.id)}}>
                        <FaArrowRight />
                    </Button>

                </div>
            </div>
        </Card>


        </>
    )
}
