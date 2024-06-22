
import React, { useEffect, useContext } from 'react'
import NoteContext from "../context/NoteContext"
import ModuleFirstPage from './ModuleFirstPage';

const Home = ({ toastmsg }) => {

    const context = useContext(NoteContext);
    const { notes, pendingEmployee, workedEmployee } = context;

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const formattedMonth = ('0' + currentMonth).slice(-2);
    const monthandYear = `${currentYear}-${formattedMonth}`

    useEffect(() => {


        setTimeout(() => {
            cssClass('Pending')
            pendingEmployee(monthandYear)
        }, 1000)
        // eslint-disable-next-line
    }, [])



    const handleClickSubmit = () => {
        toastmsg("Nice pic dear", "success")
    }

    const handlePending = (teamType) => {
        cssClass(teamType)
        pendingEmployee(monthandYear)
    }

    const handleWorked = (teamType) => {
        cssClass(teamType)
        workedEmployee(monthandYear)
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

    return (
        <div>

            <div className="main-section-container">
                <ModuleFirstPage Title="Home" Onclick={handleClickSubmit}></ModuleFirstPage>
                <div className="right-content">
                    <div className="tabs-container">
                        <div className="tabs-header" id="tab-header">
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Pending" onClick={() => { handlePending('Pending') }}>Pending</span></div>
                            <div className={`tabs-header-content`} ><span className="tabs-header-content-text" id="tab-header-span-Worked" onClick={() => { handleWorked('Worked') }}>Worked</span></div>
                        </div>
                        <div className="packs-card-container" id="packs-card-container">
                            {notes.length === 0 && 'Nothing to display'}
                            {notes.map((item, index) => {

                                let date = new Date(item.date)

                                const day = date.getDate().toString().padStart(2, '0');
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const year = date.getFullYear();

                                const formattedDate = `${day}/${month}/${year}`;

                                return (
                                    // <div className="pack-card-content" key={index}>
                                    //     <div className="pack-card-left-section">
                                    //         <div className="pack-card-details">
                                    //             <div className="pack-card-detail">
                                    //                 <h4 className="pack-card-heading"> {formattedDate}  </h4>
                                    //             </div>
                                    //             <div className="pack-card-detail">
                                    //                 <h4 className="pack-card-heading"> {item.empCode}  </h4>
                                    //             </div>
                                    //             <div className="pack-card-detail">
                                    //                 <h4 className="pack-card-heading">  {item.empName}  </h4>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>

                                    <div className="card my-2" style={{ height: '200px' }}>
                                        <h5 className="card-header">{item.empCode}</h5>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.empName}</h5>
                                            <p className="card-text">{formattedDate}</p>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home
