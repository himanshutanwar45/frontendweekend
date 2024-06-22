import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { handleallEmployeeId, handleCreateNewUser } from '../state/action/action';


const CreateUsers = ({ setProgress, toastmsg, handleallEmployeeId, handleCreateNewUser }) => {

    let userId = localStorage.getItem('userId')

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
            handleallEmployeeId(userId)
            setProgress(100);
        }, 100)
        // eslint-disable-next-line
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        setProgress(40)
        try {

            if (password === conpass) {
                const json = await handleCreateNewUser(empCode, empName, email, mobile, isAdmin, password, conpass, status)

                let { error: errorName, success } = json

                setTimeout(() => {
                    if (success) {

                        toastmsg(errorName, 'success')
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
                        toastmsg(errorName.msg, 'error')
                        //setProgress(100)
                    }
                }, 1000)


            }
            else {
                toastmsg("Password is not matched", "error")
            }


        } catch (error) {
            toastmsg(error.message, "error")
        }
        setProgress(100)
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setAddUser({ ...addUser, [name]: newValue });
    };

    

    return (
        <>

            {/*                     Create New Users                            */}

            <div className='container'>
                <div style={{ backgroundColor: "#f0f2f5",height:"calc(100vh - 130px)",overflow:"auto" }} className='p-3'>
                    <div className="row my-2">
                        <div className="col-6">
                            <div className="form-check form-switch col-md-12" style={{ marginLeft: '10px' }}>
                                <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" onChange={onChange} value={addUser.status} checked={addUser.status} />
                                <label className="form-check-label form-label" htmlFor="status">Status</label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-check form-switch col-md-12" style={{ marginLeft: '10px' }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="isAdmin" name="isAdmin" onChange={onChange} value={addUser.isAdmin} checked={addUser.isAdmin} />
                                <label className="form-check-label" htmlFor="isAdmin">is Admin</label>
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="empCode" className="form-label">Employee Code</label>
                                <input type="text" className="form-control" id="empCode" name="empCode" onChange={onChange} value={addUser.empCode} maxLength={6} />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="empName" className="form-label">Employee Name</label>
                                <input type="text" className="form-control" id="empName" name="empName" onChange={onChange} value={addUser.empName} maxLength={100} />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={addUser.email} />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                <input type="number" className="form-control" id="mobile" name="mobile" onChange={onChange} value={addUser.mobile} maxLength={10} />
                            </div>
                        </div>

                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={addUser.password} />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="col-md-12">
                                <label htmlFor="conpass" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="conpass" name="conpass" onChange={onChange} value={addUser.conpass} />
                            </div>
                        </div>
                    </div>


                    <div className='row my-3'>
                        <div className='col-1'>
                            <div className="col-md-2">
                                {localStorage.getItem('isAdmin') === 'true' ? <button type="submit" className="btn btn-outline-primary" onClick={handleClick}>Add</button> : <></>}

                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        allEmpId: state.allEmpId,
        error: state.error
    };
};

export default connect(mapStateToProps, { handleallEmployeeId, handleCreateNewUser })(CreateUsers);