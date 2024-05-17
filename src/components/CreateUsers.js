import React, { useEffect, useState, useRef,useContext } from 'react'
import NoteContext from '../context/NoteContext'


const CreateUsers = ({ setProgress, showAlert }) => {

    let host = process.env.REACT_APP_HOST;
    let authToken = localStorage.getItem('token');
    let userId = localStorage.getItem('userId')

    const context = useContext(NoteContext);
    const { employeeId,allEmployeeId } = context;
    const { pendingEntry , updateUsers } = context;

    const [addUser, setAddUser] = useState({
        empCode: "",
        empName: "",
        email: "",
        mobile: "",
        password: "",
        status: true,
        isAdmin: false,
        conpass: ""
    });

    const { empCode,
        empName,
        email,
        mobile,
        password,
        status,
        isAdmin,
        conpass } = addUser


    useEffect(() => {
        setProgress(40);
        setTimeout(() => {
            allEmployeeId(userId)
            setProgress(100);
        }, 100)
        // eslint-disable-next-line
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        setProgress(40)
        try {

            if (password === conpass) {
                const response = await fetch(`${host}/api/auth/create_user`, {
                    method: "POST",
                    headers: {
                        'auth-token': authToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ empCode, empName, email, mobile, isAdmin, password, status })
                });

                if (!response.ok) {
                    showAlert("Error while creating a new user", "danger")
                }

                const json = await response.json();

                let { error: errorName, success } = json

                setTimeout(() => {
                    if (success) {

                        showAlert(errorName, 'success')
                        //setProgress(100)
                        setAddUser({
                            empCode: "",
                            empName: "",
                            email: "",
                            mobile: "",
                            password: "",
                            status: true,
                            isAdmin: false,
                            conpass: ""
                        })
                    }
                    else {
                        showAlert(errorName.msg, 'danger')
                        //setProgress(100)
                    }
                }, 1000)


            }
            else {
                showAlert("Password is not matched", "danger")
            }


        } catch (error) {
            showAlert(error.message, "danger")
        }
        setProgress(100)
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setAddUser({ ...addUser, [name]: newValue });
    };

    ///////////////////////// For Updating the User Information using modals ////////////////////////////////////////////////////////////////

    const ref = useRef(null)
    const refClose = useRef(null)

    const [pemployee,setPEmployee] = useState({id:"",eempName:"",eemail:"",emobile:"",epassword:"",econpass:"",estatus:true,eisAdmin:false})

    const onChangeupdate = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setPEmployee({ ...pemployee, [name]: newValue });
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        ref.current.click();
        allEmployeeId(userId)
        
        setPEmployee({id:userId,
                        eempName:employeeId.empName,
                        eemail:employeeId.email,
                        emobile:employeeId.mobile,
                        estatus:employeeId.status,
                        eisAdmin:employeeId.isAdmin
        })
    }


    const handleUserUpdate = async () =>{
        try{
            setProgress(40)

            if (pemployee.epassword === pemployee.econpass){
                await updateUsers(userId,pemployee.eempName,pemployee.eemail,pemployee.emobile,pemployee.epassword || '',pemployee.estatus,pemployee.eisAdmin)


                let { error: errorName, success } = pendingEntry

                setTimeout(() => {
                    if (success) {

                        showAlert(errorName, 'success')
                        //setProgress(100)
                        setAddUser({
                            empCode: "",
                            empName: "",
                            email: "",
                            mobile: "",
                            password: "",
                            status: true,
                            isAdmin: false,
                            conpass: ""
                        })
                    }
                    else {
                        //showAlert(errorName, 'danger')
                        console.log(errorName)
                        //setProgress(100)
                    }
                }, 1000)


            }

            else{
                showAlert("Enter Correct Password","danger")
            }

            
            //console.log(pendingEntry)

        }catch(error){
            throw error.message
        }

        setProgress(100)
    }

    ///////////////////                     END                                                  ///////////////////////////////////////


    
    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Users</h1>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="eempName" className="form-label">Employee Name</label>
                                <input type="text" className="form-control" id="eempName" name="eempName" onChange={onChangeupdate} value={pemployee.eempName} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="eemail" className="form-label">Email</label>
                                <input type="text" className="form-control" id="eemail" name="eemail" onChange={onChangeupdate} value={pemployee.eemail}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emobile" className="form-label">Mobile</label>
                                <input type="text" className="form-control" id="emobile" name="emobile" onChange={onChangeupdate} value={pemployee.emobile}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="epassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="epassword" name="epassword" onChange={onChangeupdate} value={pemployee.epassword}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="econpass" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="econpass" name="econpass" onChange={onChangeupdate} value={pemployee.econpass}/>
                            </div>

                            {!localStorage.getItem('fullName')==='Admin'?<div className='row g-3'>
                                <div className="form-check form-switch col-md-3" style={{ marginLeft: '10px' }}>
                                    <input className="form-check-input form-control" type="checkbox" role="switch" id="estatus" name="estatus" checked={pemployee.estatus} onChange={onChangeupdate}/>
                                    <label className="form-check-label form-label" htmlFor="estatus">Status</label>
                                </div>

                                <div className="form-check form-switch col-md-3">
                                    <input className="form-check-input" type="checkbox" role="switch" id="eisAdmin" name="eisAdmin" checked={pemployee.eisAdmin} onChange={onChangeupdate}/>
                                    <label className="form-check-label" htmlFor="eisAdmin">Is Admin</label>
                                </div>
                            </div>:<></>}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUserUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="main-section-container">
                <div className="right-content">
                    <div className="tabs-container">
                        {/* <div className="tabs-header" id="tab-header">
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Pending" onClick={() => { handlePending('Pending') }}>Pending</span></div>
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Worked" onClick={() => { handleWorked('Worked') }}>Worked</span></div>
                        </div> */}

                        <div className="packs-card-container" id="packs-card-container">
                            <form className="row g-3">
                                <div className="row g-2">
                                    <div className="col-md-3">
                                        <label htmlFor="empCode" className="form-label">Employee Code</label>
                                        <input type="text" className="form-control" id="empCode" name="empCode" onChange={onChange} value={addUser.empCode} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="empName" className="form-label">Employee Name</label>
                                        <input type="text" className="form-control" id="empName" name="empName" onChange={onChange} value={addUser.empName} />
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={addUser.email} />
                                    </div>

                                    <div className="col-3">
                                        <label htmlFor="mobile" className="form-label">Mobile</label>
                                        <input type="number" className="form-control" id="mobile" name="mobile" onChange={onChange} value={addUser.mobile} />
                                    </div>
                                </div>

                                <div className='row g-3'>
                                    <div className="col-md-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={addUser.password} />
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="conpass" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="conpass" name="conpass" onChange={onChange} value={addUser.conpass} />
                                    </div>
                                </div>


                                <div className='row g-3'>
                                    <div className="form-check form-switch col-md-3" style={{ marginLeft: '10px' }}>
                                        <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" onChange={onChange} value={addUser.status} checked={addUser.status} />
                                        <label className="form-check-label form-label" htmlFor="status">Status</label>
                                    </div>

                                    <div className="form-check form-switch col-md-3">
                                        <input className="form-check-input" type="checkbox" role="switch" id="isAdmin" name="isAdmin" onChange={onChange} value={addUser.isAdmin} checked={addUser.isAdmin} />
                                        <label className="form-check-label" htmlFor="isAdmin">is Admin</label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Sign in</button>

                                </div>

                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-primary"  onClick={handleUpdate}>Update Info</button>

                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUsers
