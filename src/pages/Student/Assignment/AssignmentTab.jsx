import { Tabs } from "flowbite-react";
import { BsFileRichtextFill, BsDatabaseDown, BsBarChartFill, BsFillCloudUploadFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Description from "./Description";
import Datasets from "./Datasets";
import Results from "./Results";
import Submissions from "./Submissions";
import Evaluation from "./Evaluation";


export default function AssignmentTab(props){

    const { assignment, results, submission, loading } = props;
    const { description, evaluation, dataset } = assignment.exercise || {};

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
                    <Description description={description} loading={loading} />
                </Tabs.Item>

                <Tabs.Item
                    className="my-tab"
                    title="Evaluation Rules"
                    icon={BiCog}
                >
                    <Evaluation evaluationRules={evaluation} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Datasets"
                    icon={BsDatabaseDown}
                >
                    <Datasets datasets={dataset || {}} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Results"
                    icon={BsBarChartFill}
                >
                    <Results my_results={assignment.my_results || []} all_results={results} loading={loading} />
                </Tabs.Item>


                <Tabs.Item
                    title="Submission"
                    icon={BsFillCloudUploadFill}
                >
                    <Submissions submission={submission} loading={loading} />
                </Tabs.Item>


            </Tabs.Group>
        </>
    )
}
