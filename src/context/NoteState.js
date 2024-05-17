import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

  const [notes, setNotes] = useState([])

  const [employee, setEmployee] = useState([])

  const [pendingEntry, setPendingEntry] = useState([])

  const [employeeId, setEmployeeId] = useState([])

  let host = process.env.REACT_APP_HOST;
  let authToken = localStorage.getItem('token');

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

      setNotes(json)
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

      setNotes(json)
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

////////////////////////////////////      Update Weekend Support Entry       //////////////////////////////////////////////////////


  const handleUpdateEntry = async (id, empCode, empName, date) => {
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

      let newNotes = JSON.parse(JSON.stringify(employee))

      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i]
        if (element.employee[0]._id === id) {
          newNotes[i].notes[0].empCode = empCode;
          newNotes[i].notes[0].empName = empName;
          newNotes[i].notes[0].date = date;
          break;
        }
      }

      setEmployee(json)

    } catch (error) {
      return error.message
    }
  }
/////////////////////////////////////                END              //////////////////////////////////////////////////////



////////////////////////////////////      Create Pending Entry       //////////////////////////////////////////////////////

const createAutoEntry = async () => {

  try {
      const response = await fetch(`${host}/api/weekend/addAutoEntry`, {
      method: "POST",
      headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    setPendingEntry(json)

    console.log(json)

  } catch (error) {
    return error.message
  }

}
////////////////////////////////////      END       //////////////////////////////////////////////////////

////////////////////////////////////      Update Users   //////////////////////////////////////////////////////


const updateUsers = async (id, empName, email,mobile,password,status,isAdmin) => {
  try {

    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ empName, email,mobile,password,status,isAdmin }),
      headers: {
        "Content-type": "application/json",
        "auth-token": authToken
      }
    })

    const json = await response.json()

    let newNotes = JSON.parse(JSON.stringify(pendingEntry))

    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i]
      if (element.notes[0]._id === id) {
        newNotes[i].notes[0].empName = empName;
        newNotes[i].notes[0].email = email;
        newNotes[i].notes[0].mobile = mobile;
        newNotes[i].notes[0].password = password;
        newNotes[i].notes[0].status = status;
        newNotes[i].notes[0].isAdmin = isAdmin;
        break;
      }
    }

    setPendingEntry(json)
    //console.log(json)

  } catch (error) {
    return error.message
  }
}
/////////////////////////////////////                END              //////////////////////////////////////////////////////


////////////////////////////////////     Get all Employee list from Id   //////////////////////////////////////////////////////


const allEmployeeId = async (id) => {
  try {

    const response = await fetch(`${host}/api/auth/allemployeId/${id}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "auth-token": authToken
      }
    })

    const json = await response.json()

    setEmployeeId(json)

    //console.log(json)

  } catch (error) {
    return error.message
  }
}
/////////////////////////////////////                END              //////////////////////////////////////////////////////


  return (
    <NoteContext.Provider value={{
      notes, pendingEmployee, workedEmployee, handleUpdateEntry,
      pendingEntry, createAutoEntry,updateUsers,
      employee, allEmployee,
      employeeId, allEmployeeId
    }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState