import {BsCloudDownload} from "react-icons/bs";


export default function PreviousDataset(props){

    const dataset = props.dataset;


    const downloadFile = (event, downloadLink) => {
        event.preventDefault();
        window.location.href = downloadLink;
    }
    

    return (
        <>
            <div className="mt-5">
                <p className='mb-2 font-semibold text-2xl'>Your previous datasets</p>
                
                <div className="w-64 h-16 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md px-2">
                    <div className="flex items-center justify-between w-full h-full p-2">
                        <div>
                            <div className="flex items-center">
                                <p className="text-sm font-semibold truncate">
                                    {dataset.train_name}
                                </p>
                                <p className="text-xs font-light truncate ml-1">
                                    ({dataset.train_size} bytes)
                                </p>
                            </div>
                            <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                {dataset.train_upload_date}
                            </p>
                        </div>

                        <BsCloudDownload 
                            className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                            onClick={(event) => downloadFile(event, dataset.train_dataset)} 
                        />
                    </div>
                </div>

                <div className="mt-2 w-64 h-16 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md px-2">
                    <div className="flex items-center justify-between w-full h-full p-2">
                        <div>
                            <div className="flex items-center">
                                <p className="text-sm font-semibold truncate">
                                    {dataset.test_name}
                                </p>
                                <p className="text-xs font-light truncate ml-1">
                                    ({dataset.test_size} bytes)
                                </p>
                            </div>
                            <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                {dataset.test_upload_date}
                            </p>
                        </div>

                        <BsCloudDownload 
                            className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                            onClick={(event) => downloadFile(event, dataset.test_dataset)} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
