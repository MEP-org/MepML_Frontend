import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'


export default function Banner(){


    return (
        <div className='flex items-center justify-center fixed top-0 left-0 w-full h-full'>
            <div className='sm:w-3/4 xl:w-2/4 px-10'>
                <p className='text-white font-extrabold text-6xl mb-3'>MepML</p>
                <p className='text-white font-norma text-lg mb-4 text-justify'>
                    Welcome to our platform, where we bring together professors and students to explore the fascinating world of Machine Learning (ML). 
                    <br />
                    With the rapid growth of ML in recent years, our platform aims to provide an intuitive and collaborative space for both beginners and advanced users to create and solve exercises and improve their skills.
                    <br />
                    Whether you're just getting started with ML or you're a seasoned expert, our platform is the perfect place to explore and learn. Join us today and start your ML journey!
                </p>
                <Link to="/signin">
                    <Button className='w-60 mt-6'>Start using now</Button>
                </Link>
            </div>
        </div>
    )
}
  