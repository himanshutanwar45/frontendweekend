import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

  const [notes, setNotes] = useState([])

  const [employeeId, setEmployeeId] = useState([])

  let host = process.env.REACT_APP_HOST;
  let authToken = localStorage.getItem('token');

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

      let newNotes = JSON.parse(JSON.stringify(notes))

      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i]
        if (element.employee[0]._id === id) {
          newNotes[i].notes[0].empCode = empCode;
          newNotes[i].notes[0].empName = empName;
          newNotes[i].notes[0].date = date;
          break;
        }
      }

      setNotes(json)

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


//////////////////////////////        Get all Worked employee with date range      //////////////////////////////////////////

const workedEmployeeDate = async (dateFrom,dateTo) =>{
  try{
    const response = await fetch(`${host}/api/weekend/workedemployeedate`, {
      method:'POST',
      headers:{
        'content-type':"application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ dateFrom,dateTo })
    })

    const json = await response.json()

    setNotes(json)

  }catch(error){
    return error.message
  }
}

/////////////////////////////         END                                         //////////////////////////////////////

  return (
    <NoteContext.Provider value={{
      notes, handleUpdateEntry,workedEmployeeDate,
      employeeId, allEmployeeId
    }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState