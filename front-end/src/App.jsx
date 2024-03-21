import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Materiels from './Materiels'
import CreateMateriel from './CreateMateriel'
import UpdateMateriel from './UpdateMateriel'
import Diagramme from './Diagramme'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className="text-center mt-3 mb-5">Gestion des matériels</h2>
      <BrowserRouter>
        <Routes>         
          <Route path='/' element={<Materiels />} />
          <Route path='/create' element={<CreateMateriel />} />
          <Route path='/diagramme' element={<Diagramme />} />
          <Route path='/update/:id' element={<UpdateMateriel />} /> 
        </Routes>
        
    </BrowserRouter>
    </>
  )
}

export default App
