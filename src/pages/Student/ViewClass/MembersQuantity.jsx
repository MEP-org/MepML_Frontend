import { FaUserFriends } from 'react-icons/fa'

export default function MembersQuantity(props){
    
        return (
            <>
                <div className="font-semibold text-2xl flex items-center">
                    <FaUserFriends className='inline-block mr-2' size={22} />
                    {props.quantity} members
                </div>
            </>
        )


    
}
