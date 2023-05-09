import { useState } from "react";
import { Spinner, Button, Modal, Alert } from "flowbite-react";
import PreviousSubmissions from "./PreviousSubmissions";
import { BsBarChartFill, BsCodeSlash } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Submissions(props){

    const { submission, loading } = props;
    const [results, setResults] = useState();
    const [model, setModel] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        type === "results" ? setResults(file) : setModel(file);
    }


    const handleRemoveFile = (type) => {
        type === "results" ? setResults() : setModel();
    }

    
    const handleSubmit = () => {
        
        if (!results || !model) {
            setShowAlert(true);
            return;
        }
        
        //TODO: create a formdata and send it to backend via axios

        setShowModal(false);
    }
    

    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }


    const renderSubmission = () => {
        return (
            <>
                <p className='mb-2 font-semibold text-2xl'>Results Submission</p>

                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center w-full relative">
                        <label htmlFor="dropzone-results" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BsBarChartFill className="w-12 h-12 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> your results here</p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">CSV file (.csv)</p>
                            </div>
                            <input id="dropzone-results" type="file" accept=".csv,.txt" className="hidden" onChange={(e) => handleFileUpload(e, "results")} />
                        </label>
    
                        { results && (
                            <div className="absolute bottom-4 right-4 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2">
                                <div className="flex items-center justify-between w-full h-full p-2">
                                    <div className="flex center">
                                        <p className="text-sm font-semibold truncate">
                                            {results.name}
                                        </p>
                                        <p className="text-xs font-light truncate ml-1">
                                            ({results.size} bytes)
                                        </p>
                                    </div>
                                    <AiFillCloseCircle 
                                        className="w-6 h-6 ml-2 justify-self-end cursor-pointer text-gray-500 hover:text-red-500"
                                        onClick={() => handleRemoveFile("results")} 
                                    />
                                </div>
                            </div>
                        )}
                    </div> 
    
                    <div className="flex items-center justify-center w-full relative">
                        <label htmlFor="dropzone-model" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BsCodeSlash className="w-12 h-12 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> your model here</p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Python file (.py)</p>
                            </div>
                            <input id="dropzone-model" type="file" accept=".py" className="hidden" onChange={(e) => handleFileUpload(e, "model")} />
                        </label>
    
                        { model && (
                            <div className="absolute bottom-4 right-4 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2">
                                <div className="flex items-center justify-between w-full h-full p-2">
                                    <div className="flex center">
                                        <p className="text-sm font-semibold truncate">
                                            {model.name}
                                        </p>
                                        <p className="text-xs font-light truncate ml-1">
                                            ({model.size} bytes)
                                        </p>
                                    </div>
                                    <AiFillCloseCircle 
                                        className="w-6 h-6 ml-2 justify-self-end cursor-pointer text-gray-500 hover:text-red-500"
                                        onClick={() => handleRemoveFile("model")} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex justify-end mt-2">
                    <Button 
                        onClick={() => {setShowModal(true); setShowAlert(false)}}>
                        Submit my answer
                    </Button>

                    <Modal
                        show={showModal}
                        size="md"
                        popup={true}
                        onClose={() => {setShowModal(false); setShowAlert(false)} }
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to submit your answer?
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Button onClick={() => handleSubmit()} color="failure">Yes, I'm sure</Button>
                                    <Button onClick={() => {setShowModal(false); setShowAlert(false)}} color="gray">
                                            No, cancel
                                    </Button>
                                </div>
                            </div>

                            <div>
                                { showAlert && (
                                    <Alert color="failure" className="mt-4">
                                        <span>
                                            You need to upload your results and model to submit your answer.
                                        </span>
                                    </Alert>
                                )}
                            </div>

                        </Modal.Body>
                    </Modal>
                </div>

                { Object.keys(submission).length > 0 && (
                    <PreviousSubmissions submission={submission} />
                )}

            </>
        )
    }

    return (
        <>
            {loading ? renderLoading() : renderSubmission()}
        </>
    );
}
