import {FaPlusCircle} from 'react-icons/fa'
import { Button } from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function Banner(){

    return (
        <>
            <div className='grid lg:grid-cols-3 mb-12'>

                <div className='col-span-2'>
                    <div className='font-bold text-5xl mb-2'>
                        Classes
                    </div>
                    <div className='text-lg'>
                        Classes are used to group students so you can assign exercises to them.
                    </div>
                </div>

                <div className='lg:flex lg:justify-end lg:items-end lg:m-0 mt-4'>
                    <Link to='/professor/classes/add'>
                        <Button className='dark:bg-gray-800 shadow-md' color='light'>
                            <div className='w-40 text-center'>Create a new class</div>
                            <FaPlusCircle />
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
