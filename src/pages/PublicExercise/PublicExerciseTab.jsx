import { Tabs } from "flowbite-react";
import { BsFileRichtextFill, BsDatabaseDown } from "react-icons/bs";
import Description from "./Description";
import Datasets from "./Datasets";


export default function PublicExerciseTab(props){

    const { exercise, loading } = props;

    return (
        <>
            <Tabs.Group
                aria-label="Tabs with icons"
                style="underline"
            >

                <Tabs.Item
                    className="my-tab"
                    title="Description"
                    icon={BsFileRichtextFill}
                >
                    <Description description={exercise.description} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Datasets"
                    icon={BsDatabaseDown}
                >
                    <Datasets dataset={exercise.dataset || {}} loading={loading} />
                </Tabs.Item>

            </Tabs.Group>
        </>
    )
}
