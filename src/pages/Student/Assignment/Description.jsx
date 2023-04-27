import MarkdownViewer from "../../../components/MarkdownViewer";
import { Spinner } from "flowbite-react";

export default function Description(props){

    const { description, loading } = props;


    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }


    const renderDescription = () => {
        return (
            <>
                <div className='h-[80vh] mt-2'>
                    <MarkdownViewer value={description} type={"description"} />
                </div>
            </>
        )
    }


    return (
        <>
            {loading ? renderLoading() : renderDescription()}
        </>
    )
}
