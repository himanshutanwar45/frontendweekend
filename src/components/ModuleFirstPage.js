import React, { useEffect, useState, useContext } from 'react'
import NoteContext from "../context/NoteContext"

export default function ModuleFirstPage(props) {

    const [monthYear, setMonthYear] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('')
    const context = useContext(NoteContext);

    const {pendingEmployee } = context;

    

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const formattedMonth = month => ('0' + month).slice(-2);
        const generateMonths = []
        for (let i = 0; i < 3; i++) {
            const month = currentMonth + i;
            const year = currentYear + Math.floor((currentMonth + i - 1) / 12);
            const formattedMonthValue = formattedMonth(month % 12 === 0 ? 12 : month % 12);
            const monthAndYear = `${year}-${formattedMonthValue}`;
            generateMonths.push(monthAndYear)

        }

        setMonthYear(generateMonths)
        setSelectedMonth(generateMonths[0])
        pendingEmployee(generateMonths[0])

        // eslint-disable-next-line
    }, [])

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value
        setSelectedMonth('');
        setTimeout(() => { 
            setSelectedMonth(selectedValue);
            pendingEmployee(selectedValue);
            props.onDropdownChange(selectedValue);
            
        }, 50);
        
        
      };

    return (
        <div className="left-content">
            <form className='mx-3 my-5'>
                <div className="col-md-4" >
                    
                    <select id="monthYear" className="form-select" style={{ cursor: 'pointer', width: '200px' }} name="monthYear" onChange={handleDropdownChange} value={selectedMonth}>
                        {monthYear.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="desc-container">
                <div className="heading">
                    <h1>{props.Title}</h1>
                </div>
                <div>
                    <button className="btn btn-outline-primary mx-3" id="Update" onClick={props.Onclick}>Update List</button>
                </div>

                <div>
                    <button className="btn btn-outline-primary mx-3 my-2" id="Email" onClick={props.OnclickEmail}>Send Email</button>
                </div>

                <div>
                    <button className="btn btn-outline-primary mx-3" id="Email" onClick={props.onClickExcel}>Export Excel</button>
                </div>
            </div>
        </div>
    )
}
