import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ProfessorAPI } from "../../../api/ProfessorAPI";

export default function Bannner(props) {

    const {exercise, loading, profId} = props
    const navigate = useNavigate()

    const [invalidFields, setInvalidFields] = useState([])
    const [showValidationModal, setShowValidationModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showConfimationModal, setShowConfimationModal] = useState(false)

    const fieldsNames = {
        title: "Title",
        subtitle: "Subtitle",
        deadline: "Deadline",
        students_class: "Class",
        metrics: "Metrics",
        datasets: "Datasets"
    }

    const validForm = () => {
        const requiredFields = ["title", "subtitle", "deadline", "students_class"]
        let invalidFields = []

        for (const field of requiredFields) {
            if (exercise[field] === undefined || exercise[field] === "") {
                invalidFields.push(field)
            }
        }

        //validate metrics
        if (exercise.metrics.length === 0) {
            invalidFields.push("metrics")
        }

        //validate datasets
        if (exercise.id === undefined && (exercise.dataset.training === undefined || exercise.dataset.test === undefined)) {
            invalidFields.push("datasets")
        }

        setInvalidFields(invalidFields);
        return invalidFields.length === 0;
    }


    const handleSubmit = () => {
        if (loading) return;

        if (!validForm()) {
            setShowValidationModal(true);
            return;
        }
        setShowConfimationModal(true);
    }


    const handleConfirm = () => {
        if (exercise.id) {
            ProfessorAPI.updateExercise(profId, exercise.id, exercise)
            .finally(() => { navigate('/professor/exercises') })
        }
        else {
            ProfessorAPI.createExercise(profId, exercise)
            .finally(() => { navigate('/professor/exercises') })
        }
    }


    const handleDelete = () => {
        if (loading) return;
        ProfessorAPI.deleteExercise(profId, exercise.id)
        .finally(() => { navigate('/professor/exercises') })
    }


    return (
        <>
            <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                    <div className="font-bold text-4xl">
                        {exercise.id ? 
                            'View/Edit Exercise' : 
                            'Create new Exercise'
                        }
                        {exercise.id !== undefined &&
                        <div className="inline-block cursor-pointer text-red-700 hover:text-red-500 ml-2">
                            <FaTrash size={32} onClick={() => setShowDeleteModal(true)}/>
                        </div>
                    }
                    </div>
                    <div className="mt-2">
                        Exercises are used to train students on a specific topic or skill.
                        <br/>
                        You can create a new exercise or edit an existing one.
                    </div>
                </div>
                
            
                <div className="flex justify-end items-end">
                    <Button onClick={handleSubmit} className='w-36'>
                        {exercise.id ? 'Save' : 'Create'}
                    </Button>
                    <div className="w-4"/>
                    <Button color='light' onClick={() => navigate('/professor/exercises')} className='w-36'>
                        Cancel
                    </Button>
                </div>
            </div>


            {/* Invalid Fields Modal */}
            <Modal
                show={showValidationModal}
                size="md"
                popup={true}
                onClose={() => setShowValidationModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            The following fields are invalid:
                        </h3>

                        {invalidFields.map((field, index) => 
                            <div key={index} className="text-red-500 dark:text-red-400 mb-2">
                                {fieldsNames[field]}
                            </div>
                        )}

                    </div>
                </Modal.Body>
            </Modal>


            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                size="md"
                popup={true}
                onClose={() => setShowDeleteModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this exercise?
                        </h3>

                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            {/* Confirmation Modal */}
            <Modal
                show={showConfimationModal}
                size="md"
                popup={true}
                onClose={() => setShowConfimationModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to {exercise.id ? 'update' : 'create'} this exercise?
                        </h3>

                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={handleConfirm}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setShowConfimationModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}