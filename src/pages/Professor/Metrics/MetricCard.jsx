import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { MySession } from '../../../main.jsx';
import { ProfessorAPI } from '../../../api/ProfessorAPI';
import { Card } from "flowbite-react"
import { FaTrash } from "react-icons/fa"

export default function MetricCard({ metric, my }) {

    const { session } = useContext(MySession);
    const navigate = useNavigate();

    const handleDelete = (metricId) => {
        ProfessorAPI.deleteMetric(session.user.id, metricId)
        .finally(() => {navigate('/professor/metrics')})
    }

    return (
        <>
            <Card className="w-full min-h-[200px] relative">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col">
                        <div className="font-bold text-2xl mb-2">
                            {metric.title}
                        </div>
                        <div className="text-lg mb-2 text-justify">
                            {metric.description}
                        </div>
                    </div>
                    <div className="flex justify-end items-end">
                        <div className="text-sm text-gray-500">
                            Metric added by: <span className="font-bold">{metric.created_by? metric.created_by.user.name : "MepML"}</span>
                        </div>
                    </div>
                </div>
                {my && (
                <div className="absolute top-0 right-0 p-4">
                    <div className=" cursor-pointer text-red-700 hover:text-red-500 ml-2">
                        <FaTrash size={24} onClick={() => handleDelete(metric.id)} />
                    </div>
                </div>
                )}
            </Card>
        </>
    )
}