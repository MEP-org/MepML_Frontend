import { Spinner } from 'flowbite-react';
import { BsCloudDownload } from 'react-icons/bs';


export default function Datasets(props){

    const { datasets, loading } = props;


    const downloadFile = (event, downloadLink) => {
        event.preventDefault();
        window.location.href = downloadLink;
    }


    const renderLoading = () => {
        return (
            <div className='w-fit mx-auto'>
                <Spinner size='xl' />
            </div> 
        )
    }


    const renderDatasets = () => {

        return (
            <>
                <p className='mb-2 font-semibold text-2xl'>Assignment Datasets</p>

                <div className='grid grid-cols-2 gap-4'>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md p-3">
                        <p className='text-lg'>Training Dataset</p>
                        <hr className="h-px mt-1 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex items-center justify-between w-full p-2">
                            <div>
                                <div className="flex center">
                                    <p className="text-sm font-semibold truncate">
                                        {datasets.train.name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({datasets.train.size} bytes)
                                    </p>
                                </div>
                                <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                    {datasets.train.uploadDate}
                                </p>
                            </div>

                            <BsCloudDownload 
                                className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                                onClick={(event) => downloadFile(event, datasets.train.url)} 
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md p-3">
                        <p className='text-lg'>Test Dataset</p>
                        <hr className="h-px mt-1 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                        <div className="flex items-center justify-between w-full p-2">
                            <div>
                                <div className="flex center">
                                    <p className="text-sm font-semibold truncate">
                                        {datasets.test.name}
                                    </p>
                                    <p className="text-xs font-light truncate ml-1">
                                        ({datasets.test.size} bytes)
                                    </p>
                                </div>
                                <p className="mt-1 text-xs font-extralight truncate text-gray-400">
                                    {datasets.train.uploadDate}
                                </p>
                            </div>

                            <BsCloudDownload 
                                className="w-5 h-5 justify-self-end cursor-pointer text-gray-500 hover:text-green-500"
                                onClick={(event) => downloadFile(event, datasets.test.url)} 
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            {loading ? renderLoading() : renderDatasets()}
        </>
    )
}
