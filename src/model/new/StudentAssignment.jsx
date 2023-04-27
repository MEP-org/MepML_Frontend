export const StudentAssignment = {
    id: '',
    title: '',
    subtitle: '',
    publishDate: '',
    deadlineDate: '',
    attemptsLimit: '',
    isPublic: '',
    studentClass: {
        id: '',
        name: '',
    },
    metrics: [
        // {
        //     id: '',
        //     name: '',
        //     description: '',
        //     value: '', // my result for this metric
        // }
    ],
    descriptionMD: '',
    evaluationMD: '',
    trainingDataset: {
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    }, 
    testDataset: {
        // only the y column
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    },
    results: [
        // student
        // {
        //     id: '',
        //     name: '',
        //     metricsResults: [
        //         // values for each metric in the same order as the metrics array
        //     ],
        // }
    ],
    codeSubmission: {
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    },
    resultsSubmission: {
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    },
}