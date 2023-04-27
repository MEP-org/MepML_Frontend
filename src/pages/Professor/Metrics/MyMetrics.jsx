import MetricCard from "./MetricCard";

export default function MyMetrics({metrics}) {

    const myId = 1;

    const myMetrics = metrics.filter(metric => metric.author.id === myId);

    return (
        <>
            {myMetrics.length === 0 && 
                <div className="font-bold text-3xl text-center">
                    You don't have any metrics
                </div>
            }
            {myMetrics.length > 0 &&
                <div className='grid grid-cols-3 gap-8'>
                {myMetrics.map((metric) => {
                    return (
                        <MetricCard metric={metric} key={metric.id} />
                    )
                })}
                </div>
            }
        </>
    )
}