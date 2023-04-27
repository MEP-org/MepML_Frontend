export const ProfExercise = {
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
        // X and y columns
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
        //     codeUrl: '',
        // }
    ]
}