import './App.css'
import Citylist from './Components/Datalist/Citylist'
import Weatherpage from './Components/Datalist/Weatherpage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
      <div>
       
        <Router>
          <Routes>
            <Route path='/' element={<Citylist/>}/>
            <Route path='/:ascii_name' element={<Weatherpage/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
