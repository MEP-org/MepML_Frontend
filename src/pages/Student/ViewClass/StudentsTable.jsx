import { Table } from 'flowbite-react'



export default function StudentsTable(props){

    // console.log(props.myClass);


    const renderStudentsTable = () => {

        return (
                <>
                    {props.myClass.map((item) => 
                        <Table.Row key={item.Nmec} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.Nmec}
                            </Table.Cell>
                            <Table.Cell>
                                {item.name}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </>  
        );
    }

    

    return (
        <>
            <div>
                <Table striped={true} hoverable={true} style={{ fontSize: '1em' }}>
                    <Table.Head style={{ fontSize: '1.2em', height: '3em' }}>
                        <Table.HeadCell className='w-1/6'>
                            NMEC
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Nome
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {renderStudentsTable()}
                        {/* {rows} */}
                    </Table.Body>
                    </Table>
            </div>
        </>
    )


}


