import { metrics } from './data.json';

export const MetricsAPI = {
    getMetrics: async function() {
        // add a delay to simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return metrics;
    }
};