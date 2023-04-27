import { Card } from "flowbite-react"

export default function MetricCard({ metric }) {

    return (
        <>
            <Card className="w-full min-h-[200px]">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col">
                        <div className="font-bold text-2xl mb-2">
                            {metric.name}
                        </div>
                        <div className="text-lg mb-2 text-justify">
                            {metric.description}
                        </div>
                    </div>
                    <div className="flex justify-end items-end">
                        <div className="text-sm text-gray-500">
                            Metric added by: <span className="font-bold">{metric.author.name}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}