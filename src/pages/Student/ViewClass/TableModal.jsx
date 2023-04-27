import  React, {useState, useEffect}  from 'react'
import { Modal, Button } from 'flowbite-react';
import StudentsTable from './StudentsTable';


export default function TableModal(props){

    const [showModal, setShowModal] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);

    // Calculate the maximum height of the modal based on the screen height
    useEffect(() => {
      const calculateMaxHeight = () => {
        const screenHeight = window.innerHeight;
        // Set the maximum height to 70% of the screen height
        const newMaxHeight = screenHeight * 0.8;
        setMaxHeight(newMaxHeight);
      };
      calculateMaxHeight();
      window.addEventListener('resize', calculateMaxHeight);
      return () => {
        window.removeEventListener('resize', calculateMaxHeight);
      };
    }, []);



    // Handle the modal opening and closing
    const handleShowModal = () => {
        setShowModal(true);
    };



    const handleCloseModal = () => {
        setShowModal(false);
    };
    

    
    return (
        <>
            <Button onClick={handleShowModal}>
                Show Students on this Class
            </Button>

            <Modal
                show={showModal}
                onClose={handleCloseModal}
            >
                <Modal.Header>
                    {props.quantity} membros
                </Modal.Header>
                <Modal.Body>
                    <div style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>
                        <StudentsTable myClass={props.myClass} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )


    
}




