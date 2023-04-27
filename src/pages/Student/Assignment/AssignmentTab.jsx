import { Tabs } from "flowbite-react";
import { BsFileRichtextFill, BsDatabaseDown, BsBarChartFill, BsFillCloudUploadFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Description from "./Description";
import Datasets from "./Datasets";
import Results from "./Results";
import Submissions from "./Submissions";
import Evaluation from "./Evaluation";


export default function AssignmentTab(props){

    const { assignment, loading } = props;

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
                    <Description description={assignment.description} loading={loading} />
                </Tabs.Item>

                <Tabs.Item
                    className="my-tab"
                    title="Evaluation Rules"
                    icon={BiCog}
                >
                    <Evaluation evaluationRules={assignment.evaluationRules} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Datasets"
                    icon={BsDatabaseDown}
                >
                    <Datasets datasets={assignment.datasets} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Results"
                    icon={BsBarChartFill}
                >
                    <Results results={assignment.results} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Submission"
                    icon={BsFillCloudUploadFill}
                >
                    <Submissions submissions={assignment.submissions} loading={loading} />
                </Tabs.Item>


            </Tabs.Group>
        </>
    )
}
