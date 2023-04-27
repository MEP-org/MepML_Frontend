import { useEffect } from "react"
import { Button, Modal, TextInput } from "flowbite-react"
import { useNavigate } from "react-router-dom"

export default function ClassNameModal({classData, setClassData, showModal, setShowModal}) {

    const navigate = useNavigate()    

    const handleCloseModal = () => {
        if (!classData.name) navigate('/professor/classes')
        setShowModal(false)
    }

    const handleSubmitModal = (e) => {
        e.preventDefault()
        const name = document.getElementById('className').value
        setClassData({...classData, name})
        setShowModal(false)
    }

    useEffect(() => {
        if (showModal) document.getElementById('className').focus()
    }, [showModal])

    return (
        <>
            <Modal
                show={showModal}
                size="md"
                onClose={handleCloseModal}
            >
                <Modal.Header>
                    <div className="font-bold text-3xl text-center">
                        Class Name
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-4">
                            <TextInput
                                id = "className"
                                label="Class name"
                                placeholder="Class name"
                                defaultValue={classData.name}                              
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button type="submit" onClick={handleSubmitModal} >
                                {classData.name ? 
                                    'Save' :
                                    'Create'
                                }
                            </Button>
                            <Button color="gray" onClick={handleCloseModal} >
                                No, cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}