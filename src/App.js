
import Login from './components/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './css/Login.css'
import './App.css'
import CreateWeekendEntry from './components/CreateWeekendEntry';
import {useState } from 'react';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import CreateUsers from './components/CreateUsers'
import WorkedEmployee from './components/WorkedEmployee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUsers from './components/UpdateUsers';

function App() {

  const [progress, setProgress] = useState(0)

  const [notify, setNotify] = useState([])

  const toastmsg = (message,type) =>{
    switch (type) {
      case 'info':
        return setNotify(toast.info(message))

      case 'error':
        return setNotify(toast.error(message))

      case 'success':
        return setNotify(toast.success(message))

      case 'warning':
        return setNotify(toast.warn(message))

      default:
        return setNotify(toast(message))
    }
  }


  return (
    <>
        <Router>
          <Navbar></Navbar>
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}>
          </LoadingBar>
          <ToastContainer notify={notify} closeOnClick stacked draggable></ToastContainer>
          <Routes>
            <Route exact path='/login' element={<Login  setProgress={setProgress} ></Login>}></Route>
            <Route exact path="/" element={<CreateWeekendEntry  setProgress={setProgress} toastmsg={toastmsg}></CreateWeekendEntry>}></Route>
            <Route exact path="/createuser" element={<CreateUsers  setProgress={setProgress} toastmsg={toastmsg}></CreateUsers>}></Route>
            <Route exact path="/workedemployee" element={<WorkedEmployee  setProgress={setProgress} toastmsg={toastmsg}> </WorkedEmployee>}></Route>
            <Route exact path='/updateuser' element={<UpdateUsers setProgress={setProgress} toastmsg={toastmsg}></UpdateUsers>}></Route>
          </Routes>
        </Router>
    </>
  );
}

export default App;
