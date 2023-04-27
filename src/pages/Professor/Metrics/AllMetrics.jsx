import MetricCard from "./MetricCard"

export default function AllMetrics({metrics}) {

    return (
        <>
            <div className='grid grid-cols-3 gap-8'>
                {metrics.map((metric) => {
                    return (
                        <MetricCard metric={metric} key={metric.id} />
                    )
                })}
            </div>
        </>
    )
}