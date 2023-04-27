import { useLocation } from 'react-router-dom'

export default function Error(){

    const message = useLocation().pathname

    return (
        <>
            <div className='container mx-auto mt-8'>
                <span className='text-2xl font-bold'>Error 404</span>
                <p className='text-xl'>The page {message} does not exist</p>
            </div>
        </>
    )
}
