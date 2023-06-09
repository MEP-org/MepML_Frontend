import { useEffect, useState, useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { MySession } from '../../../main.jsx';
import {Tabs} from 'flowbite-react'
import FadeIn from 'react-fade-in';

import AllMetrics from './AllMetrics'
import MyMetrics from './MyMetrics'
import AddMetric from './AddMetric'
import Loading from '../../../components/Loading'

import { ProfessorAPI } from '../../../api/ProfessorAPI'

export default function Metrics(){
    const { session } = useContext(MySession);
    const profId = session.user.id;

    const location = useLocation();
    const tabsRef = useRef(null)
    const [activeTab, setActiveTab] = useState(0)
    const [metrics, setMetrics] = useState({ my_metrics: [], other_metrics: [] })
    const [loading, setLoading] = useState(true)

    const hash2index = {
        '#all-metrics': 0,
        '#my-metrics': 1,
        '#add-metric': 2
    }

    useEffect(() => {
        setLoading(true)
        ProfessorAPI.getMetrics(profId)
        .then((data) => { setMetrics(data) })
        .finally(() => { setLoading(false) })
        tabsRef.current.setActiveTab(hash2index[location.hash] || 0)
    }, [location])


    return (
        <>
            <FadeIn className="container pt-12 pb-20">
                <div className='font-bold text-5xl mb-2'>
                    Metrics
                </div>
                <div className='text-lg mb-8'>
                    Metrics are used to evaluate the performance of your students.
                </div>

                <Tabs.Group
                    aria-label="Exercise Tabs"
                    style="underline"
                    className="sticky top-0 z-10 bg-white dark:bg-gray-900"
                    ref={tabsRef}
                    onActiveTabChange={(activeTab) => {
                        setActiveTab(activeTab)
                    }}
                >
                    <Tabs.Item
                        title="All Metrics"
                        // icon={}
                    >
                        <FadeIn key={activeTab}>
                            {loading ? <Loading /> : <AllMetrics metrics={metrics} />}
                        </FadeIn>
                    </Tabs.Item>
                    <Tabs.Item
                        title="My Metrics"
                        // icon={}
                    >
                        <FadeIn key={activeTab}>
                            {loading ? <Loading /> : <MyMetrics metrics={metrics} />}
                        </FadeIn>
                    </Tabs.Item>
                    <Tabs.Item
                        title="Add Metric"
                        // icon={}
                    >
                        <FadeIn key={activeTab}>
                            {loading ? <Loading /> : <AddMetric metrics={metrics} />}
                        </FadeIn>
                    </Tabs.Item>
                </Tabs.Group>
            </FadeIn>
        </>
    )
}