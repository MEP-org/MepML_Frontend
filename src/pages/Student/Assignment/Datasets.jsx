import { Spinner } from 'flowbite-react';
import { BsCloudDownload } from 'react-icons/bs';


export default function Datasets(props){

    const { datasets, loading } = props;


    const downloadFile = (event, downloadLink) => {
        event.preventDefault();
        window.location.href = downloadLink;
    }


    if (loading) {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }
    else {

        return (
            <>
                <p className='mb-2 font-semibold text-2xl'>Assignment Datasets</p>

                <div className='grid grid-cols-2 gap-4'>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md p-3">
                        <p className='text-lg'>Training Dataset</p>
                        <hr className="h-px mt-1 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex items-center justify-between w-full p-2">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold truncate">
                                        {datasets.train_name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({datasets.train_size} bytes)
                                    </p>
                                </div>
                                <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                    {datasets.train_upload_date}
                                </p>
                            </div>

                            <BsCloudDownload 
                                className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                                onClick={(event) => downloadFile(event, datasets.train_dataset)} 
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md p-3">
                        <p className='text-lg'>Test Dataset</p>
                        <hr className="h-px mt-1 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex items-center justify-between w-full p-2">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold truncate">
                                        {datasets.test_name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({datasets.test_size} bytes)
                                    </p>
                                </div>
                                <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                    {datasets.test_upload_date}
                                </p>
                            </div>

                            <BsCloudDownload 
                                className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                                onClick={(event) => downloadFile(event, datasets.test_dataset)} 
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
