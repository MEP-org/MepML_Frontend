import { useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { StudentAPI } from '../../../api/StudentAPI';
import { MySession } from '../../../main.jsx';

import { Spinner, Button, Modal, Alert } from "flowbite-react";
import PreviousSubmissions from "./PreviousSubmissions";
import { BsBarChartFill, BsCodeSlash } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineExclamationCircle, HiInformationCircle } from "react-icons/hi";

export default function Submissions(props){

    const { id } = useParams();
    const navigate = useNavigate();
    const { session, setSession } = useContext(MySession);
    const { assignment, submission, loading } = props;
    const [results, setResults] = useState();
    const [model, setModel] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);


    const ableToSubmit = () => {

        if (submission && (Object.keys(assignment).length != 0)) {

            if (!assignment.exercise.limit_of_attempts) {
                return true;
            }

            if (assignment.exercise.limit_of_attempts <= submission.quantity_of_submissions) {
                return false;
            }
        }

        if (Object.keys(assignment).length != 0) {

            const deadline = new Date(assignment.exercise.deadline);
            const today = new Date();
            if (deadline < today) {
                return false;
            }
        }

        return true;
    }


    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        if (
            type === "results" && 
            (!/\.(csv|txt)$/i.test(file.name) || file.size > 0.5 * 1024 * 1024)
        ) {
            alert("Invalid file type or size. Please upload a CSV file without header and with a maximum size of 500KB");
            return;
        }
        if (
            type !== "results" &&
            (!/\.(py|ipynb)$/i.test(file.name) || file.size > 1 * 1024 * 1024)
        ) {
            alert("Invalid file type or size. Please upload a Python file or a Jupyter Notebook with a maximum size of 1MB");
            return;
        }

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

        const payload = {
            file_name_result: results.name,
            file_name_code: model.name,
            result_submission: results,
            code_submission: model
        }
        
        let success = false;
        setLoadingSubmit(true);
        StudentAPI.postSubmission(session.user.id, id, payload)
            .then((res) => {
                if (res.status === 201) {
                    success = true;
                    
                }
            })
            .catch((err) => {
                setShowModalError(true);
            })
            .finally(() => {
                setLoadingSubmit(false);
                setShowModal(false);
                if (success) {
                    setResults();
                    setModel();
                    navigate(`/student/assignments/${id}/#results`);
                }
            })
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
                <p className='mb-5 font-semibold text-2xl'>Submission</p>

                <Alert
                    color="info"
                    rounded={true}
                    className="mb-6"
                    >
                    <p className="font-bold">Important!</p>
                    <p>The results file must be a CSV file without header</p>
                </Alert>

                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center w-full relative">
                        <label htmlFor="dropzone-results" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BsBarChartFill className="w-12 h-12 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> your results here</p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">CSV file (.csv)</p>
                            </div>
                            <input id="dropzone-results" type="file" accept=".csv,.txt" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "results")} />
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
                        <label htmlFor="dropzone-model" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <BsCodeSlash className="w-12 h-12 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> your model here</p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Python file (.ipynb, .py)</p>
                            </div>
                            <input id="dropzone-model" type="file" accept=".ipynb,.py" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "model")} />
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
                

                
                { !ableToSubmit() && 
                    <Alert
                        color="failure"
                        icon={HiInformationCircle}
                        className="mt-4"
                    >
                        <span>
                        <span className="font-medium">
                            Warning!
                        </span>
                        {' '}You cannot submit your results after the deadline or after you have reached the maximum number of attempts.
                        </span>
                    </Alert>
                }


                { ableToSubmit() &&
                    <div className="flex justify-end mt-2">
                        <Button onClick={() => {setShowModal(true); setShowAlert(false)}}>
                            Submit my answer
                        </Button>
                    </div>
                }

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
                                <Button onClick={() => handleSubmit()} color="success">
                                    {loadingSubmit? <Spinner size={'sm'} /> : "Yes, I'm sure" }
                                    </Button>
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

                <Modal
                    show={showModalError}
                    size="md"
                    popup={true}
                    onClose={() => {setShowModalError(false)} }
                >
                    <Modal.Header />
                    <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Error submitting your results! Verify that your results file is a CSV file without header.
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button onClick={() => {setShowModalError(false)}} color="gray">
                            Cancel
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>


                { submission && (
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
