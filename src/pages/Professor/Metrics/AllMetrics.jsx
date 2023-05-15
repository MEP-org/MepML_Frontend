import MetricCard from "./MetricCard"

export default function AllMetrics({metrics}) {

    const allMetrics = [...metrics.my_metrics, ...metrics.other_metrics]

    return (
        <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allMetrics.map((metric) => {
                    return (
                        <MetricCard metric={metric} key={metric.id} />
                    )
                })}
            </div>
        </>
    )
}