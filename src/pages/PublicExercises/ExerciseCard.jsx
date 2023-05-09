
import { Card, Button } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ExerciseCard(props){

    const navigate = useNavigate();
    const { exercise, user } = props;

    return (
        <>
            <Card className="border-l-8 !border-l-blue-500">
                <div className="overflow-auto flex flex-col h-44">
                    <div>
                        <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {exercise.title}
                        </p>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {exercise.subtitle}
                        </p>
                    </div>


                    <div className="mt-auto flex justify-between items-end overflow-hidden">
                        <div className="text-gray-700 dark:text-gray-400">
                            <span className="inline-block text-xs font-light pr-1">Published at</span>
                            <span className="inline-block text-xs font-bold">
                                {exercise.publish_date}
                            </span>
                            <span className="inline-block text-xs font-light pl-1">by</span>
                            <span className="inline-block text-xs font-bold pl-1">Prof. {exercise.created_by.name}</span>
                        </div>

                        <Button className="!p-0 !h-11 !w-11" onClick={() => {navigate("/"+user+"/publicExercises/" + exercise.id)}}>
                            <FaArrowRight />
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}
