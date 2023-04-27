import { useState } from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as DarkTheme, oneLight as LightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useThemeMode, Label, TextInput, Textarea, Button } from "flowbite-react";
import {AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AddMetric() {

    const [mode,,] = useThemeMode();
    const navigate = useNavigate();
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

    return (
        <>
            <div className="grid grid-cols-3 gap-8 mb-10">

                <div className="col-span-2">

                    <Label>Name</Label>
                    <TextInput className="mb-4 mt-2" placeholder="Metric name" />

                    <Label>Description</Label>
                    <Textarea className="mt-2" placeholder="Metric description" rows={4}/>

                </div>

                <div className="flex items-center justify-center w-full relative">
                    <label htmlFor="dropzone-model" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Drop</span> Metric here</p>
                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-light">Or click</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Python file (.py)</p>
                        </div>
                        <input id="dropzone-model" type="file" accept=".py" className="hidden" onChange={handleFileUpload} />
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

            <div className="flex justify-center mt-8">
                <Button className="w-64" onClick={() => navigate('/professor')}>Submit</Button>
            </div>
        </>
    )
}