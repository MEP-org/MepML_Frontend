import MarkdownViewer from "../../../components/MarkdownViewer";
import { Spinner } from "flowbite-react";

export default function Evaluation(props){

    const { evaluationRules, loading } = props;


    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }


    const renderEvaluationRules = () => {

        return (
            <>
                <div className='h-[80vh] mt-2'>
                    <MarkdownViewer value={evaluationRules} type={"evaluation_rules"} />
                </div>
            </>
        )
    }


    return (
        <>
            {loading ? renderLoading() : renderEvaluationRules()}
        </>
    )
}
