export const Assignment = {
    id: undefined,
    title: undefined,
    subtitle: undefined,
    publishingDate: undefined,
    deliveryDeadline: undefined,
    visible: undefined,
    attemptsLimit: undefined,
    totalSubmissions: undefined,
    studentClass: {
        id: undefined,
        name: undefined
    },
    description: undefined,
    evaluationRules: undefined,
    datasets: {
        train: {
            fileName: undefined,
            size: undefined,
            url: undefined,
            uploadDate: undefined
        },
        test: {
            fileName: undefined,
            size: undefined,
            url: undefined,
            uploadDate: undefined
        }
    },
    submissions: {
        results: {
            file: {
                name: undefined,
                size: undefined,
                url: undefined,
                uploadDate: undefined
            }
        },
        model: {
            file: {
                name: undefined,
                size: undefined,
                url: undefined,
                uploadDate: undefined
            }
        }
    },
    results: {
        student: [],
        class: []
    }
}