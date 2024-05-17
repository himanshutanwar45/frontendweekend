
import Login from './components/Login';
import NoteState from './context/NoteState'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './css/Login.css'
import './App.css'
import CreateWeekendEntry from './components/CreateWeekendEntry';
import { useState } from 'react';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import CreateUsers from './components/CreateUsers'

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({ msg: message, types: type })

    setTimeout(() => {
      setAlert(null);
    }, 3000)

  }

  const [progress, setProgress] = useState(0)

  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}>
          </LoadingBar>
          <Routes>
            <Route exact path="/" element={<Login showAlert={showAlert} setProgress={setProgress}></Login>}></Route>
            <Route exact path="/createweekendentry" element={<CreateWeekendEntry showAlert={showAlert} setProgress={setProgress}></CreateWeekendEntry>}></Route>
            <Route exact path="/createuser" element={<CreateUsers showAlert={showAlert} setProgress={setProgress}></CreateUsers>}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
