import React, { useEffect, useState } from 'react'


export default function ModuleFirstPage(props) {

    const [monthYear, setMonthYear] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('')

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
        //pendingEmployee(generateMonths[0])

        // eslint-disable-next-line
    }, [])

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value
        setSelectedMonth('');
        setTimeout(() => {
            setSelectedMonth(selectedValue);
            //pendingEmployee(selectedValue);
            props.onDropdownChange(selectedValue);

        }, 50);


    };

    return (
        <>
            <div className="col" >
                <form>
                    <select id="monthYear" className="form-select form-select-sm" aria-label="Default select example" style={{ cursor: 'pointer'}} name="monthYear" onChange={handleDropdownChange} value={selectedMonth}>
                        {monthYear.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </form>


                <div className="col">
                    <h1 >{props.Title}</h1>
                    <div >
                        {localStorage.getItem('token')?
                            <button className="btn btn-outline-primary" id="Update" onClick={props.Onclick}>Update List</button>
                            : <></>
                        }
                        <button className="btn btn-outline-primary" id="Email" onClick={props.onClickExcel}>Export Excel</button>
                    </div>

                </div>

            </div>
        </>

    )
}
