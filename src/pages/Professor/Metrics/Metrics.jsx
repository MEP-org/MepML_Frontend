import { useEffect, useState } from 'react'
import {Tabs} from 'flowbite-react'

import AllMetrics from './AllMetrics'
import MyMetrics from './MyMetrics'
import AddMetric from './AddMetric'
import Loading from '../../../components/Loading'

import { ProfessorAPI } from '../../../api/ProfessorAPI'

export default function Metrics(){
    const profId = 1

    const [metrics, setMetrics] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        ProfessorAPI.getMetrics(profId)
        .then((data) => { setMetrics(data) })
        .finally(() => { setLoading(false) })
    }, [])


    return (
        <>
            <div className="container my-8">
                <div className='font-bold text-5xl mb-4'>
                    Metrics
                </div>
                <div className='mt-2 text-lg'>
                    Metrics are used to evaluate the performance of your students.
                </div>

                <Tabs.Group
                    aria-label="Exercise Tabs"
                    style="underline"
                    className="sticky top-0 z-10 bg-white dark:bg-gray-900"
                >
                    <Tabs.Item
                        title="All Metrics"
                        // icon={}
                    >
                        {loading ? <Loading /> : <AllMetrics metrics={metrics} />}
                    </Tabs.Item>
                    <Tabs.Item
                        title="My Metrics"
                        // icon={}
                    >
                        {loading ? <Loading /> : <MyMetrics metrics={metrics} />}
                    </Tabs.Item>
                    <Tabs.Item
                        title="Add Metric"
                        // icon={}
                    >
                        {loading ? <Loading /> : <AddMetric metrics={metrics} />}
                    </Tabs.Item>
                </Tabs.Group>
            </div>
        </>
    )
}