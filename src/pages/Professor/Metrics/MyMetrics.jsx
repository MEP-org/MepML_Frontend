import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";

export default function MyMetrics({metrics}) {

    const myMetrics = [...metrics.my_metrics]

    return (
        <>
            {myMetrics.length === 0 && 
                <div className="text-xl text-center pt-16">
                    You have not created any metric yet
                    <br />
                    <Link to='/professor/metrics/#add-metric' className='text-blue-500 hover:underline font-normal'> Create one</Link>
                </div>
            }
            {myMetrics.length > 0 &&
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {myMetrics.map((metric) => {
                    return (
                        <MetricCard metric={metric} key={metric.id} my={true} />
                    )
                })}
                </div>
            }
        </>
    )
}