import { Spinner } from "flowbite-react"

export default function Loading() {

    return (
        <>
            <div className='w-fit mx-auto h-16'>
                <Spinner size='xl' />
            </div> 
        </>
    )
}