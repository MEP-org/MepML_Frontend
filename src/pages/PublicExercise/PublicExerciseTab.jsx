import { Tabs } from "flowbite-react";
import { BsFileRichtextFill, BsDatabaseDown } from "react-icons/bs";
import Description from "./Description";
import Datasets from "./Datasets";
import FadeIn from 'react-fade-in';
import { useState } from "react";


export default function PublicExerciseTab(props){

    const { exercise, loading } = props;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs.Group
                aria-label="Tabs with icons"
                style="underline"
                onActiveTabChange={(activeTab) => {
                    setActiveTab(activeTab)
                }}
            >

                <Tabs.Item
                    className="my-tab"
                    title="Description"
                    icon={BsFileRichtextFill}
                >
                    <FadeIn key={activeTab}>
                    <Description description={exercise.description} loading={loading} />
                    </FadeIn>
                </Tabs.Item>


                <Tabs.Item
                    title="Datasets"
                    icon={BsDatabaseDown}
                >
                    <FadeIn key={activeTab}>
                    <Datasets dataset={exercise.dataset || {}} loading={loading} />
                    </FadeIn>
                </Tabs.Item>

            </Tabs.Group>
        </>
    )
}
