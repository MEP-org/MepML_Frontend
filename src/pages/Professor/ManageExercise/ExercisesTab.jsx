import {Tabs, Spinner} from "flowbite-react"
import { BsFileRichtextFill, BsDatabaseDown, BsBarChartFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Description from "./Description"
import Evaluation from "./Evaluation"
import Datasets from "./Datasets"
import Results from "./Results"

export default function ExercisesTab(props){

    const {handleChange, exercise, classes, metrics, results, loading, setExercise} = props

    const renderLoading = () => {
        return (
            <div className='flex center'>
                <Spinner size='xl' />
            </div> 
        )
    }

    const tabs = [
        {
            title: "Description",
            icon: BsFileRichtextFill, 
            content: loading ? renderLoading() : 
            <Description handleChange={handleChange} exercise={exercise} classes={classes} setExercise={setExercise} />
        },
        {
            title: "Evaluation Rules", 
            icon: BiCog, 
            content: loading ? renderLoading() : 
            <Evaluation handleChange={handleChange} exercise={exercise} metrics={metrics} />
        },
        {
            title: "Datasets", 
            icon: BsDatabaseDown, 
            content: loading ? renderLoading() : 
            <Datasets handleChange={handleChange} exercise={exercise} />
        },
        {
            title: "Results", 
            icon: BsBarChartFill, 
            content: loading ? renderLoading() : 
            <Results exercise={exercise} results={results} />
        },
    ]
    if (!exercise.id) tabs.pop() // remove results tab if exercise is not created yet

    return (
        <>
            <Tabs.Group
                aria-label="Exercise Tabs"
                style="underline"
                className="sticky top-0 z-10 bg-white dark:bg-gray-900"
            >
                {tabs.map((tab) => {
                    return (
                        <Tabs.Item
                            key={tab.title}
                            title={tab.title}
                            icon={tab.icon}
                        >
                            {tab.content}
                        </Tabs.Item>
                    )
                })}
            </Tabs.Group>
        </>
    )
}