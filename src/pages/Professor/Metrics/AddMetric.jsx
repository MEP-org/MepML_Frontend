import { useState, useContext } from "react"
import { MySession } from '../../../main.jsx';
import { ProfessorAPI } from '../../../api/ProfessorAPI';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as DarkTheme, oneLight as LightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useThemeMode, Label, TextInput, Textarea, Button, Tooltip, Modal } from "flowbite-react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function AddMetric() {
    const { session } = useContext(MySession);
    const [mode,,] = useThemeMode();
    const navigate = useNavigate();
    const [showValidationModal, setShowValidationModal] = useState(false)
    const [showConfimationModal, setShowConfimationModal] = useState(false)

    const [codeString, setCodeString] = useState('');
    const [metric, setMetric] = useState({
        name: undefined,
        description: undefined,
        file: undefined,
    })

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            setCodeString(text)
        }
        reader.readAsText(file)
        setMetric({...metric, file: file})
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(metric)

        if (metric.name === "" || metric.name === undefined || metric.description === "" || metric.description === undefined || metric.file === undefined) {
            setShowValidationModal(true);
            return;
        }
        setShowConfimationModal(true);
    }


    const handleConfirm = () => {
        const payload = {
            title: metric.name,
            description: metric.description,
            metric_file: metric.file
        }

        ProfessorAPI.addMetric(session.user.id, payload)
        .finally(() => {navigate('/professor/metrics#my-metrics')})
    }


    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-3 lg:gap-6">

                    <div className="col-span-2">
                        <Label>Name</Label>
                        <TextInput className="mb-4 mt-2" placeholder="Metric name" id="name" onChange={(e) => {setMetric({...metric, name: e.target.value})}} />

                        <Label>Description</Label>
                        <Textarea className="mt-2" placeholder="Metric description" rows={4} id="description" onChange={(e) => {setMetric({...metric, description: e.target.value})}} />
                    </div>

                    <div className="flex items-center justify-center w-full relative mt-5 lg:mt-0">
                        <label htmlFor="metric" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> Metric here</p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                                <p className="text-xs mb-4 text-gray-500 dark:text-gray-400">Python file (.py)</p>

                                <Tooltip
                                    content="def score(true_labels: np.ndarray, pred_labels: np.ndarray) -> float:"
                                    placement="bottom"
                                >
                                    <BiHelpCircle size={20} className="text-gray-500 dark:text-gray-400" />
                                </Tooltip>
                            </div>
                            <input id="metric" type="file" accept=".py" className="hidden" onChange={handleFileUpload} />
                        </label>

                        {metric.file && (
                            <div className="absolute bottom-4 right-4 w-64 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2">
                                <div className="flex items-center justify-between w-full h-full p-2">
                                    <div className="flex center">
                                        <p className="text-sm font-semibold truncate">
                                            {metric.file.name}
                                        </p>
                                        <p className="text-xs font-light truncate ml-1">
                                            ({metric.file.size} bytes)
                                        </p>
                                    </div>
                                    <AiFillCloseCircle 
                                        className="w-6 h-6 ml-2 justify-self-end cursor-pointer text-gray-500 hover:text-red-500"
                                        onClick={() => {setMetric({...metric, file: undefined}); setCodeString('')}}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-5 mb-10">
                    <Button className="w-64" type="submit">Submit</Button>
                </div>
            </form>


            {codeString &&
                <SyntaxHighlighter 
                    className="important rounded-lg max-h-[500px] overflow-y-auto drop-shadow-md border border-gray-200 dark:border-gray-700 !bg-white dark:!bg-gray-800"
                    language="python" 
                    style={mode === 'dark' ? DarkTheme : LightTheme}
                    showLineNumbers={true} 
                    wrapLongLines={true}
                >
                    {codeString}
                </SyntaxHighlighter>
            }


            {/* Invalid Fields Modal */}
            <Modal
                show={showValidationModal}
                size="md"
                popup={true}
                onClose={() => setShowValidationModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Invalid fields
                        </h3>
                    </div>
                </Modal.Body>
            </Modal>


            {/* Confirmation Modal */}
            <Modal
                show={showConfimationModal}
                size="md"
                popup={true}
                onClose={() => setShowConfimationModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to add this metric?
                        </h3>

                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={handleConfirm}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setShowConfimationModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}