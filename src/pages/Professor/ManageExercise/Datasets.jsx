import{useState} from "react";
import { BsBarChartFill } from "react-icons/bs";
import {MdAssignment} from "react-icons/md";
import {Table} from "flowbite-react";
import {AiFillCloseCircle} from "react-icons/ai";
import PreviousDataset from "./PreviousDataset";

export default function Datasets(props){

    const { handleChange, exercise } = props
    const [training, setTraining] = useState([])
    const [test, setTest] = useState([])

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0]
        // verify file type -> csv and for type="training" -> 50 mb and test -> 1 mb
        if( 
            !/\.(csv|txt)$/i.test(file.name) || 
            (type === "training" && file.size > 50*1024*1024) ||
            (type === "test" && file.size > 5*1024*1024)
        ){
            alert("Invalid file type or size, must be csv or txt and less than 50 mb for training and 5 mb for test")
            return
        }


        handleChange({target: {name: "dataset", value: {...exercise.dataset, [type]: file}}})
        
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            const lines = text.split("\n")
            const data = lines.slice(0, 11).map((line) => {
                return line.split(",")
            })
            type === "training" ? setTraining(data) : setTest(data)
        }
        reader.readAsText(file)
        // hide id="previous_dataset"
        document.getElementById("previous_dataset").style.display = "none"
    }

    const handleRemoveFile = (type) => {
        type === "training" ? setTraining([]) : setTest([])
        handleChange({target: {name: "dataset", value: {[type]: undefined}}})
    }

    const renderTable = (data) => {
        return (
            <>
                <Table
                    striped = {true}
                    hoverable = {true}
                    className = "w-full overflow-x-auto"
                >
                    <Table.Head>
                        {data[0] && data[0].map((header) => {
                            return <Table.HeadCell key={header}>{header}</Table.HeadCell>
                        })}
                    </Table.Head>

                    <Table.Body>
                        {data.slice(1).map((row, index) => {
                            return (
                                <Table.Row key={index}>
                                    {row.map((cell, index) => {
                                        return <Table.Cell key={index}>{cell}</Table.Cell>
                                    })}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </>
        )
    }


    return (
        <>
            <div className="grid lg:grid-cols-2 gap-4">

                <div className="flex items-center justify-center w-full relative">
                    <label htmlFor="dropzone-train" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <BsBarChartFill className="w-12 h-12 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> Training dataser here</p>
                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV file (.csv)</p>
                        </div>
                        <input id="dropzone-train" type="file" accept=".csv,.txt" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "training")} />
                    </label>

                    {exercise.dataset.training && (
                        <div className="absolute bottom-4 right-4 w-64 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2">
                            <div className="flex items-center justify-between w-full h-full p-2">
                                <div className="flex center">
                                    <p className="text-sm font-semibold truncate">
                                        {exercise.dataset.training.name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({exercise.dataset.training.size} bytes)
                                    </p>
                                </div>
                                <AiFillCloseCircle 
                                    className="w-6 h-6 ml-2 justify-self-end cursor-pointer text-gray-500 hover:text-red-500"
                                    onClick={() => handleRemoveFile("training")} 
                                />
                            </div>
                        </div>
                    )}
                </div> 

                <div className="flex items-center justify-center w-full relative">
                    <label htmlFor="dropzone-test" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <MdAssignment className="w-12 h-12 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> Test dataset here</p>
                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV file (.csv)</p>
                        </div>
                        <input id="dropzone-test" type="file" accept=".csv,.txt" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, "test")} />
                    </label>

                    {exercise.dataset.test && (
                        <div className="absolute bottom-4 right-4 w-64 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-2">
                            <div className="flex items-center justify-between w-full h-full p-2">
                                <div className="flex center">
                                    <p className="text-sm font-semibold truncate">
                                        {exercise.dataset.test.name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({exercise.dataset.test.size} bytes)
                                    </p>
                                </div>
                                <AiFillCloseCircle 
                                    className="w-6 h-6 ml-2 justify-self-end cursor-pointer text-gray-500 hover:text-red-500"
                                    onClick={() => handleRemoveFile("test")} 
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {renderTable(training)}
                </div>
                
                <div>
                    {renderTable(test)}
                </div>


                { exercise.id && (
                    <div id="previous_dataset">
                        <PreviousDataset dataset={exercise.dataset} />
                    </div>
                )}

            </div>
        </>
    )
}