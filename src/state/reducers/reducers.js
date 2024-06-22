
import {
    FETCH_PENDING_EMPLOYEE_SUCCESS,
    FETCH_WORKED_EMPLOYEE_SUCCESS,
    FETCH_CREATE_PENDING_ENTRY,
    FETCH_GET_EMPLOYEE_NAME_WITH_CODE,
    FETCH_GET_EMPLOYEE_CODE_WITH_NAME,
    FETCH_ALL_EMPLOYEE,
    UPDATE_PENDING_EMPLOYEE,
    GET_WORKED_EMPLOYEE_WITH_DATE,
    CREATE_NEW_USER,
    UPDATE_USER,
    FETCH_ERROR
} from '../action/actiontypes';

// Initial state
const initialState = {
    pendingEmployees: [],
    pendingEntry:[],
    updateEntry:[],
    emp:[],
    allEmp:[],
    workedEmployeeDate:[],
    createUsers:[],
    error: null
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_PENDING_EMPLOYEE_SUCCESS:
            return { ...state, pendingEmployees: action.payload, error: null };

        case FETCH_WORKED_EMPLOYEE_SUCCESS:
            return { ...state, pendingEmployees: action.payload, error: null };

        case FETCH_CREATE_PENDING_ENTRY:
            return { ...state, pendingEntry: action.payload, error: null };

        case FETCH_GET_EMPLOYEE_NAME_WITH_CODE:
            return { ...state, emp: action.payload, error: null };

        case FETCH_GET_EMPLOYEE_CODE_WITH_NAME:
            return { ...state, emp: action.payload, error: null };

        case FETCH_ALL_EMPLOYEE:
            return { ...state, allEmp: action.payload, error: null };

        case UPDATE_PENDING_EMPLOYEE:
            return { ...state, updateEntry: action.payload, error: null };
        
        case GET_WORKED_EMPLOYEE_WITH_DATE:
            return { ...state, workedEmployeeDate: action.payload, error: null };

        case CREATE_NEW_USER:
            return { ...state, createUsers: action.payload, error: null }
        
        case UPDATE_USER:
            return { ...state, createUsers: action.payload, error: null };

        case FETCH_ERROR:
            return { ...state, error: action.payload,pendingEmployees: [],
                pendingEntry:[],
                updateEntry:[],
                emp:[],
                allEmp:[],
                workedEmployeeDate:[],
                createUsers:[], };
        default:
            return state;
    }
};

export default reducer;
