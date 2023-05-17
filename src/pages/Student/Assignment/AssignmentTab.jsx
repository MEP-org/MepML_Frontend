import { Tabs } from "flowbite-react";
import { BsFileRichtextFill, BsDatabaseDown, BsBarChartFill, BsFillCloudUploadFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Description from "./Description";
import Datasets from "./Datasets";
import Results from "./Results";
import Submissions from "./Submissions";
import Evaluation from "./Evaluation";
import FadeIn from 'react-fade-in';
import { useState } from "react";


export default function AssignmentTab(props){

    const { assignment, results, submission, loading, tabsRef } = props;
    const { description, evaluation, dataset } = assignment.exercise || {};
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs.Group
                aria-label="Tabs with icons"
                style="underline"
                ref={tabsRef}
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
                    <Description description={description} loading={loading} />
                    </FadeIn>
                </Tabs.Item>

                <Tabs.Item
                    className="my-tab"
                    title="Evaluation Rules"
                    icon={BiCog}
                >
                    <FadeIn key={activeTab}>
                    <Evaluation evaluationRules={evaluation} loading={loading} />
                    </FadeIn>
                </Tabs.Item>


                <Tabs.Item
                    title="Datasets"
                    icon={BsDatabaseDown}
                >
                    <FadeIn key={activeTab}>
                    <Datasets datasets={dataset || {}} loading={loading} />
                    </FadeIn>
                </Tabs.Item>


                <Tabs.Item
                    title="Results"
                    icon={BsBarChartFill}
                >
                    <FadeIn key={activeTab}>
                    <Results exercise={assignment.exercise || {metrics: []}} my_results={assignment.my_results || []} results={results} loading={loading} /> 
                    </FadeIn>
                </Tabs.Item>


                <Tabs.Item
                    title="Submission"
                    icon={BsFillCloudUploadFill}

                >
                    <FadeIn key={activeTab}>
                    <Submissions assignment={assignment} submission={submission} loading={loading} />
                    </FadeIn>
                </Tabs.Item>


            </Tabs.Group>
        </>
    )
}
