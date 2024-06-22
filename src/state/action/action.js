
import {
    FETCH_PENDING_EMPLOYEE_SUCCESS,
    FETCH_WORKED_EMPLOYEE_SUCCESS,
    FETCH_CREATE_PENDING_ENTRY,
    FETCH_GET_EMPLOYEE_NAME_WITH_CODE,
    FETCH_GET_EMPLOYEE_CODE_WITH_NAME,
    FETCH_ALL_EMPLOYEE,
    UPDATE_PENDING_EMPLOYEE,
    GET_WORKED_EMPLOYEE_WITH_DATE,
    GET_EMPLOYEE_ID_USERS,
    CREATE_NEW_USER,
    UPDATE_USER,
    FETCH_ERROR
} from './actiontypes';


let authToken = localStorage.getItem('token');
let host = process.env.REACT_APP_HOST;

// Route 1 :: Fetching pending employee using dropdown
export const fetchPendingEmployee = (monthYear) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/weekend/pendingemployee`, {
            method: "POST",
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ monthYear }),
        });
        const json = await response.json();
        dispatch({ type: FETCH_PENDING_EMPLOYEE_SUCCESS, payload: json });
    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
    }
};

// Route 2 :: Fetching worked employee using dropdown
export const fetchWorkedEmployee = (monthYear) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/weekend/workedemployee`, {
            method: "POST",
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ monthYear }),
        });
        const json = await response.json();
        dispatch({ type: FETCH_WORKED_EMPLOYEE_SUCCESS, payload: json });
    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
    }
};


//Route 3 :: Create the entry who is comming on next month using dropdown
export const createPendingEntry = (monthYear) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/weekend/creatependingweekendentry`, {
            method: "POST",
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ monthYear }),
        })

        const json = await response.json()

        dispatch({ type: FETCH_CREATE_PENDING_ENTRY, payload: json });
        return json;
    }
    catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 4 :: Get Employee Name using EmpCode
export const getEmployeeName = (empCode) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/employeename/${empCode}`, {
            method: 'GET',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        dispatch({ type: FETCH_GET_EMPLOYEE_NAME_WITH_CODE, payload: json });

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 5 :: Get Employee Code using EmpName
export const getEmployeeCode = (empName) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/employeecode/${empName}`, {
            method: 'GET',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        dispatch({ type: FETCH_GET_EMPLOYEE_CODE_WITH_NAME, payload: json });

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 6 :: Get all the employees
export const getAllEmployee = () => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/allemployee`, {
            method: 'GET',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        dispatch({ type: FETCH_ALL_EMPLOYEE, payload: json });
        return json
    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 6 :: Get all the employees
export const handleUpdateEntry = (id, empCode, empName, date) => async (dispatch) => {
    try {

        const response = await fetch(`${host}/api/weekend/updateentry/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ empCode, empName, date }),
            headers: {
                "Content-type": "application/json",
                "auth-token": authToken
            }
        })

        const json = await response.json()

        dispatch({ type: UPDATE_PENDING_EMPLOYEE, payload: json });
        return json

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 7::: Get all worked employee with date range 

export const handleWorkedEmployeeDate = (dateFrom, dateTo) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/weekend/workedemployeedate`, {
            method: 'POST',
            headers: {
                'content-type': "application/json",
                "auth-token": authToken
            },
            body: JSON.stringify({ dateFrom, dateTo })
        })

        const json = await response.json()

        dispatch({ type: GET_WORKED_EMPLOYEE_WITH_DATE, payload: json });
        return json

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 8 ::::::::::::Get Employee id of the cureent users
export const handleallEmployeeId = (id) => async (dispatch) => {
    try {

        const response = await fetch(`${host}/api/auth/allemployeId/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "auth-token": authToken
            }
        })

        const json = await response.json()
        dispatch({ type: GET_EMPLOYEE_ID_USERS, payload: json });

        return json

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 9 :::::::::::::Create New Users 
export const handleCreateNewUser = (empCode, empName, email, mobile, isAdmin, password, conpass, status) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/create_user`, {
            method: "POST",
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empCode, empName, email, mobile, isAdmin, password, conpass, status })
        });

        const json = await response.json();
        dispatch({ type: CREATE_NEW_USER, payload: json });

        return json

    } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}

//Route 10 :::::::::: Update Existsing user
export const hangleUpdateUsers = (userId,eempName, eemail, emobile, epassword, econpass, estatus, eisAdmin) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/updateuser/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ eempName, eemail, emobile, epassword, econpass, estatus, eisAdmin }),
            headers: {
                "Content-type": "application/json",
                "auth-token": authToken
            }
        })

        const json = await response.json()

        dispatch({ type: UPDATE_USER, payload: json });

        return json;
    }
    catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message })
    }
}