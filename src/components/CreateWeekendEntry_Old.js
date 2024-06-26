import React, { useContext, useEffect, useRef, useState } from 'react'
import ModuleFirstPage from './ModuleFirstPage'
import NoteContext from "../context/NoteContext"
import PendingEmployee from './PendingEmployee';

const CreateWeekendEntry = ({ showAlert, setProgress }) => {

    const context = useContext(NoteContext);
    const { handleUpdateEntry } = context;

    const [pEmployee, setpEmployy] = useState({ id: "", eempCode: "", eempName: "", edate: "" });

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const formattedMonth = ('0' + currentMonth).slice(-2);
    const monthandYear = `${currentYear}-${formattedMonth}`

    const [monYear, setMonyear] = useState(monthandYear)

    const ref = useRef(null)
    const refClose = useRef(null)

    const exportExcelOpen = useRef(null)
    const exportExcelclose = useRef(null)

    // console.log(monYear)

    let authToken = localStorage.getItem('token');
    let host = process.env.REACT_APP_HOST;

    const [penotes, setPeNotes] = useState([])
    const [employee, setEmployee] = useState([])

    useEffect(() => {
        setProgress(40)
        cssClass('Pending');
        setTimeout(() => {

            allEmployee()
            pendingEmployee(monYear)
            //console.log(monYear)
            setProgress(100);
        }, 100)


        // eslint-disable-next-line 
    }, [])

    /////////////////////////////////////Get All Pending Employeee //////////////////////////////////////////////////////

    const pendingEmployee = async (monthYear) => {

        try {
            const response = await fetch(`${host}/api/weekend/pendingemployee`, {
                method: "POST",
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ monthYear }),
            })

            const json = await response.json()

            setPeNotes(json)
        } catch (error) {
            return error.message
        }

    }
    ////////////////////////////////////     END        //////////////////////////////////////////////////////

    /////////////////////////////////////Get All Worked Employeee //////////////////////////////////////////////////////

    const workedEmployee = async (monthYear) => {

        try {
            const response = await fetch(`${host}/api/weekend/workedemployee`, {
                method: "POST",
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ monthYear }),
            })

            const json = await response.json()

            setPeNotes(json)
        } catch (error) {
            return error.message
        }

    }

    ///////////////////////////////////////           END            /////////////////////////////////////////////////////

    ///////////////////////////////////// All Employee //////////////////////////////////////////////////////

    const allEmployee = async () => {

        try {
            const response = await fetch(`${host}/api/auth/allemployee`, {
                method: 'GET',
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            setEmployee(json)
        }
        catch (error) {
            return error.message
        }
    }

    ///////////////////////////////////               END             //////////////////////////////////////////////////////

    ////////////////////////////////////      Create Pending Entry       //////////////////////////////////////////////////////

    const handleClick = async () => {
        try {
            const response = await fetch(`${host}/api/weekend/creatependingweekendentry`, {
                method: "POST",
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ monthYear: monYear }),
            })

            const json = await response.json()

            let { error: errorName, success } = json;
            setTimeout(() => {
                if (success) {
                    showAlert(errorName, 'success')
                    setProgress(100)
                    pendingEmployee(monYear)
                }
                else {
                    showAlert(errorName, 'danger')
                    setProgress(100)
                    pendingEmployee(monYear)
                }
            }, 1000)

        } catch (error) {
            return error.message
        }
    }
    ////////////////////////////////////      END       //////////////////////////////////////////////////////


    const handleDropdownChange = (selectedValue) => {
        setMonyear(selectedValue);
        pendingEmployee(selectedValue)
    };

    const updateDate = (currentEmp) => {
        ref.current.click();
        // let date = new Date(currentEmp.date)
        // const day = (date.getDate()).toString().padStart(2, '0');
        // const month = (date.getMonth() + 1).toString().padStart(2, '0');
        // const year = date.getFullYear();
        // const formattedDate = `${year}-${month}-${day}`;

        setpEmployy({ id: currentEmp._id, eempCode: currentEmp.empCode, eempName: currentEmp.empName, edate: "" })
    }

    const onChange = async (e) => {

        const { name, value } = e.target;

        if (name === 'eempCode') {

            const response = await fetch(`${host}/api/auth/employeename/${value}`, {
                method: 'GET',
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },
            })

            const json = await response.json()

            setpEmployy({ ...pEmployee, eempCode: value, eempName: json });

        }

        else if (name === 'eempName') {

            const response = await fetch(`${host}/api/auth/employeecode/${value}`, {
                method: 'GET',
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                },
            })

            const json = await response.json()

            setpEmployy({ ...pEmployee, eempName: value, eempCode: json });
        }

        else {
            setpEmployy({ ...pEmployee, [name]: value });
        }

    };


    const handleClickUpdate = (e) => {
        e.preventDefault();
        //console.log(pEmployee.id)
        handleUpdateEntry(pEmployee.id, pEmployee.eempCode, pEmployee.eempName, pEmployee.edate)
        setpEmployy({ eempCode: "", eempName: "", edate: "" })
        refClose.current.click();
        setProgress(40)
        setTimeout(() => {
            pendingEmployee(monYear)
            setProgress(100)
        }, 1000)
    }

    const cssClass = (teamType) => {
        try {
            const tabs = document.querySelectorAll('.tabs-header-content-text');
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            const clickedTab = document.getElementById(`tab-header-span-${teamType}`);
            clickedTab.classList.add('active');
        } catch (error) {
            throw error
        }
    }

    const handlePending = (teamType) => {
        setProgress(40)
        setTimeout(() => {
            cssClass(teamType)
            pendingEmployee(monYear)
            setProgress(100)
        }, 1000)

    }

    const handleWorked = (teamType) => {

        setProgress(40)
        setTimeout(() => {
            cssClass(teamType)
            workedEmployee(monYear)
            setProgress(100)
        }, 1000)
    }


    ///////////////////////////     Export in excel     //////////////////////////////////////////////////////////////

    const handleExportExcel = () => {
        try {
            exportExcelOpen.current.click()
            //console.log(notes)
        }
        catch (error) {
            throw error.message
        }
    }

    ///////////////////////////     END     //////////////////////////////////////////////////////////////


    const handleSendEmail = (e) => {
        e.preventDefault()
        showAlert("Nice Pic", "success")
    }

    return (
        <>
            {/*                                         For Updating the Weekend Support                                          */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Date</h1>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Employee Code</label>
                                    <input type="text" list="empCode" className="form-control" id="eempCode" name="eempCode" value={pEmployee.eempCode} onChange={onChange} />
                                    <datalist id="empCode">
                                        {employee.map((option, index) => (

                                            <option key={index} value={option.empCode} />
                                        ))}
                                    </datalist>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Employee Name</label>
                                    <input type="text" list="empName" className="form-control" id="eempName" name="eempName" value={pEmployee.eempName} onChange={onChange} />

                                    <datalist id="empName">
                                        {employee.map((option, index) => (
                                            <option key={index} value={option.empName} />
                                        ))}
                                    </datalist>

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Weekend Date</label>
                                    <input type="date" className="form-control" id="edate" name="edate" value={pEmployee.edate} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClickUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*                                         Showing the result in excel format                                          */}

            <button ref={exportExcelOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exportExcel">
                Launch demo modal
            </button>

            <div className="modal fade" id="exportExcel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Excel Generate</h1>
                            <button type="button" ref={exportExcelclose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-bordered border-primary">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col"> Employee Code </th>
                                        <th scope="col"> Employee Name </th>
                                        <th scope="col"> Weekend Date </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {penotes.map((item, index) => {

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
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSendEmail}>Send Email</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*                                 END                                                       */}

            {/* <div className="main-section-container container">
                <ModuleFirstPage Title="Create your Weekend Entry" Onclick={handleClick} onDropdownChange={handleDropdownChange} onClickExcel={handleExportExcel}
                    pendingEmployee={pendingEmployee}></ModuleFirstPage>

                <div className="right-content">
                    <div className="tabs-container">
                        <div className="tabs-header" id="tab-header">
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Pending" onClick={() => { handlePending('Pending') }}>Pending</span></div>
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Worked" onClick={() => { handleWorked('Worked') }}>Worked</span></div>
                        </div>

                        <div className="packs-card-container" id="packs-card-container">
                            {penotes.length === 0 && 'Nothing to display'}
                            {penotes.map((item) => {
                                return (
                                    <PendingEmployee key={item._id} updateDate={updateDate} pEmployee={item} ></PendingEmployee>
                                )


                            })}

                        </div>
                    </div>
                </div>
            </div> */}

            <div className='container' >
                <div className='d-flex justify-content-between' style={{ backgroundColor: '#f0f2f5' }}>
                    <div className='col-3 px-2 py-2'>
                        <ModuleFirstPage Title="Create your Weekend Entry" Onclick={handleClick} onDropdownChange={handleDropdownChange} onClickExcel={handleExportExcel}
                            pendingEmployee={pendingEmployee}></ModuleFirstPage>
                    </div>
                    <div className='col-9 px-2 py-2'>
                        <div className="tabs-header d-flex justify-content-between bg-white" id="tab-header">
                            <div style={{cursor:'pointer'}}><span className="tabs-header-content-text mx-2" id="tab-header-span-Pending" onClick={() => { handlePending('Pending') }}>Pending</span></div>
                            <div style={{cursor:'pointer'}}><span className="tabs-header-content-text mx-2" id="tab-header-span-Worked" onClick={() => { handleWorked('Worked') }}>Worked</span></div>
                        </div>

                        <div className='packs-card-container' id="packs-card-container">
                            {penotes.length === 0 && 'Nothing to display'}
                            {penotes.map((item) => {
                                return (
                                    <PendingEmployee key={item._id} updateDate={updateDate} pEmployee={item} ></PendingEmployee>
                                )


                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateWeekendEntry
