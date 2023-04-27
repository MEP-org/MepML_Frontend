import {BsCloudDownload} from "react-icons/bs";


export default function PreviousSubmissions(props){

    const submissions = props.submissions;


    const downloadFile = (event, downloadLink) => {
        event.preventDefault();
        window.location.href = downloadLink;
    }
    

    return (
        <>
            <div>
                <p className='mb-2 font-semibold text-2xl'>Your previous submission</p>
                
                <div className="w-64 h-16 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md px-2">
                    <div className="flex items-center justify-between w-full h-full p-2">
                        <div>
                            <div className="flex center">
                                <p className="text-sm font-semibold truncate">
                                    {submissions.results.name}
                                </p>
                                <p className="text-xs font-light truncate ml-1">
                                    ({submissions.results.size} bytes)
                                </p>
                            </div>
                            <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                {submissions.results.uploadDate}
                            </p>
                        </div>

                        <BsCloudDownload 
                            className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                            onClick={(event) => downloadFile(event, submissions.results.url)} 
                        />
                    </div>
                </div>

                <div className="mt-2 w-64 h-16 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md px-2">
                    <div className="flex items-center justify-between w-full h-full p-2">
                        <div>
                            <div className="flex center">
                                <p className="text-sm font-semibold truncate">
                                    {submissions.model.name}
                                </p>
                                <p className="text-xs font-light truncate ml-1">
                                    ({submissions.model.size} bytes)
                                </p>
                            </div>
                            <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                {submissions.model.uploadDate}
                            </p>
                        </div>

                        <BsCloudDownload 
                            className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                            onClick={(event) => downloadFile(event, submissions.model.url)} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
