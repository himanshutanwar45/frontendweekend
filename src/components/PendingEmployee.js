import React from 'react'

export default function PendingEmployee(props) {

    const { pEmployee, updateDate } = props

    const dateStr = pEmployee.date;

    const day = dateStr.substring(8, 10);
    const month = dateStr.substring(5, 7);
    const year = dateStr.substring(0, 4);

    const formattedDate = `${day}/${month}/${year}`;

    //console.log(pEmployee.empName,pEmployee.date)

    return (

        <>
            <div className="card my-2" style={{ height: '200px' }}>
                <h5 className="card-header">{pEmployee.empCode}</h5>
                <div className="card-body">
                    <h5 className="card-title">{pEmployee.empName}</h5>
                    <p className="card-text">{formattedDate}</p>
                    {localStorage.getItem('token')?
                        pEmployee.status === 'Pending' ? <i className="fa-sharp fa-regular fa-pen-to-square mx-2" 
                            style={{ cursor: "pointer" }} onClick={() => { updateDate(pEmployee) }}> </i> 
                                    : <i></i>
                        : <></>
                    }
                    
                </div>
            </div>

        </>
    )
}
