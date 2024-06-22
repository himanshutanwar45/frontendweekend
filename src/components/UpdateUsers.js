import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { handleallEmployeeId, hangleUpdateUsers } from '../state/action/action';

const UpdateUsers = ({setProgress, toastmsg, handleallEmployeeId, hangleUpdateUsers}) => {

    let userId = localStorage.getItem('userId')

    ///////////////////////// For Updating the User Information using modals ////////////////////////////////////////////////////////////////

    const [pemployee, setPEmployee] = useState({ id: "", eempName: "", eemail: "", emobile: "", epassword: "", econpass: "", estatus: true, eisAdmin: false })

    const { eempName, eemail, emobile, epassword, econpass, estatus, eisAdmin } = pemployee

    useEffect(()=>{
        setProgress(40)
        setTimeout(()=>{
            handleUpdate()
            setProgress(100)
        },1000)

        // eslint-disable-next-line
    },[])

    const onChangeupdate = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setPEmployee({ ...pemployee, [name]: newValue });
    }


    const handleUpdate = async() => {
        setProgress(40)
        try{

            const response = await handleallEmployeeId(userId)

            setPEmployee({
                id:userId,
                eempName:response.empName,
                eemail:response.email,
                emobile:response.mobile,
                epassword:"",
                econpass:"",
                estatus:response.status,
                eisAdmin:response.isAdmin

            })

        }catch(error){
            throw error.message
        }
        setProgress(100)
    }


    ////////////////////////////////////      Update Users   //////////////////////////////////////////////////////

    const handleUserUpdate = async () => {
        try {
            setProgress(40)

            const pendingEntry = await hangleUpdateUsers(userId, eempName, eemail, emobile, epassword, econpass, estatus, eisAdmin)

            let { error: errorName, success } = pendingEntry

            setTimeout(() => {
                if (success) {

                    toastmsg(errorName, 'success')
                    //setProgress(100)
                    // setPEmployee({
                    //     eempCode: "",
                    //     eempName: "",
                    //     eemail: "",
                    //     emobile: "",
                    //     epassword: "",
                    //     estatus: true,
                    //     eisAdmin: false,
                    //     econpass: ""
                    // })
                }
                else {
                    toastmsg(errorName, 'error')
                    //console.log(errorName)
                    //setProgress(100)
                }
            }, 1000)

            //console.log(pendingEntry)

        } catch (error) {
            throw error.message
        }

        setProgress(100)

    }

    ///////////////////                     END                                                  ///////////////////////////////////////


    return (
        <>
            <div className="container my-2 " >
                <div className="modal-dialog bg-body-tertiary" style={{ height:"calc(100vh - 130px)",overflow:"auto", padding:"10px" }}>
                    <div className="modal-content">
                     
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="eempName" className="form-label">Employee Name</label>
                                <input type="text" className="form-control" id="eempName" name="eempName" onChange={onChangeupdate} value={eempName} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="eemail" className="form-label">Email</label>
                                <input type="text" className="form-control" id="eemail" name="eemail" onChange={onChangeupdate} value={eemail} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emobile" className="form-label">Mobile</label>
                                <input type="text" className="form-control" id="emobile" name="emobile" onChange={onChangeupdate} value={emobile} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="epassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="epassword" name="epassword" onChange={onChangeupdate} value={epassword} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="econpass" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="econpass" name="econpass" onChange={onChangeupdate} value={econpass} />
                            </div>

                            {!localStorage.getItem('fullName') === 'Admin' ? <div className='row g-3'>
                                <div className="form-check form-switch col-md-3" style={{ marginLeft: '10px' }}>
                                    <input className="form-check-input form-control" type="checkbox" role="switch" id="estatus" name="estatus" checked={estatus} onChange={onChangeupdate} />
                                    <label className="form-check-label form-label" htmlFor="estatus">Status</label>
                                </div>

                                <div className="form-check form-switch col-md-3">
                                    <input className="form-check-input" type="checkbox" role="switch" id="eisAdmin" name="eisAdmin" checked={eisAdmin} onChange={onChangeupdate} />
                                    <label className="form-check-label" htmlFor="eisAdmin">Is Admin</label>
                                </div>
                            </div> : <></>}

                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleUserUpdate}>Save changes</button>
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

const mapDispatchToProps = {
    handleallEmployeeId, hangleUpdateUsers
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsers);
