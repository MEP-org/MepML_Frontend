
export const Exercise = {
    id: '',
    title: '',
    subtitle: '',
    publishDate: '',
    deadlineDate: '',
    attemptsLimit: '',
    isPublic: '',         // true or false
    author: {
        // foreign key
        id: '',
        name: '',
    },
    studentClass: {
        // foreign key
        id: '',
        name: '',
    },
    metrics: [
        // foreign keys
        // {
        //     id: '',
        //     name: '',
        //     description: '',
        // }
    ],
    descriptionMD: '',
    evaluationMD: '',
    trainingDataset: {
        // foreign key
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    }, 
    testDataset: {
        // foreign key (separado em X e y)
        fileName: '',
        size: '',
        url: '',
        uploadDate: ''
    },
    // results é adicionado à parte dependendo do pedido 
}