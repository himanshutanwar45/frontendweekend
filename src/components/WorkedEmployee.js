import React, { useEffect, useState} from 'react'
import * as FileSaver from 'file-saver'
import { connect} from 'react-redux';
import {handleWorkedEmployeeDate} from '../state/action/action';
import XLSX from 'sheetjs-style'

const WorkedEmployee = ({ setProgress,handleWorkedEmployeeDate,workedEmployeeDate }) => {

    function getFirstDayOfMonth() {
        const now = new Date(); // Current date
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }

    function getLastDayOfMonth() {
        const now = new Date(); // Current date
        return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const firstDayOfMonth = getFirstDayOfMonth()
    const lastDayOfMonth = getLastDayOfMonth()

    const DateFrom = formatDate(firstDayOfMonth)
    const DateTo = formatDate(lastDayOfMonth)

    const [employee, setEmployee] = useState({ dateFrom: DateFrom, dateTo: DateTo })

    const {dateFrom, dateTo} = employee

    const fileType = 'application/vnd/openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx'

    const onChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setProgress(40)

        setTimeout(() => {
            handleWorkedEmployeeDate(dateFrom,dateTo)
            setProgress(100)
        }, 100)
        // eslint-disable-next-line
    }, [])



    const handleGetReport = async (e) => {
        setProgress(40)
        try {
            handleWorkedEmployeeDate(dateFrom,dateTo)
           
        } catch (error) {
            return error.message
        }

        setProgress(100)
    }


    const handleExport = async () => {
        setProgress(40)
        try {
            const ws = XLSX.utils.json_to_sheet(workedEmployeeDate)
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, 'Data' + fileExtension);

        } catch (error) {
            return error.message
        }

        setProgress(100)
    }

    return (
        <>
            <div className='container' >
                <div className='d-flex justify-content-between' style={{ backgroundColor: '#f0f2f5' }}>
                    <div className='col-3 px-2 py-2'>
                        <div className="col" >
                            <form>
                                <div className="input-group mb-3">
                                    <input type="date" className="form-control" aria-label="Username" id="dateFrom" name="dateFrom" onChange={onChange} value={employee.dateFrom} />
                                    <input type="date" className="form-control" aria-label="Server" id="dateTo" name="dateTo" onChange={onChange} value={employee.dateTo}></input>
                                </div>
                            </form>


                            <div className="col">
                                <h1 >Worked Employee List</h1>
                                <div >
                                    <button className="btn btn-outline-primary" id="Update" onClick={handleGetReport}>Get Report</button>
                                    <button className="btn btn-outline-primary" id="Email" onClick={handleExport}>Export Excel</button>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className='col-9 px-2 py-2'>
                        {/* <div className="tabs-header d-flex justify-content-between bg-white" id="tab-header">
                            <div style={{ cursor: 'pointer' }}><span className="tabs-header-content-text mx-2" id="tab-header-span-Pending" onClick={() => { handlePending('Pending') }}>Pending</span></div>
                            <div style={{ cursor: 'pointer' }}><span className="tabs-header-content-text mx-2" id="tab-header-span-Worked" onClick={() => { handleWorked('Worked') }}>Worked</span></div>
                        </div> */}

                        <div className='packs-card-container' id="packs-card-container">
                            {!workedEmployeeDate || workedEmployeeDate.length === 0?(<p> Nothing to display </p>):
                            (
                            <table className="table table-striped table-bordered border-primary">

                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col"> Employee Code </th>
                                        <th scope="col"> Employee Name </th>
                                        <th scope="col"> Weekend Date </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {workedEmployeeDate.map((item,index) =>{
                                    let date = new Date(item.date)

                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getFullYear();

                                    const formattedDate = `${day}/${month}/${year}`;

                                    return (<tr key={index}>
                                        <td>{item.empCode}</td>
                                        <td>{item.empName}</td>
                                        <td>{formattedDate}</td>
                                    </tr>)
                                })}
                                </tbody>
                            </table>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        workedEmployeeDate:state.workedEmployeeDate,
        error: state.error
    };
};

const mapDispatchToProps = {
    handleWorkedEmployeeDate
};


export default connect(mapStateToProps, mapDispatchToProps)(WorkedEmployee); 




