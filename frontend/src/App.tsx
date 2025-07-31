import { Routes, Route } from 'react-router-dom'

import Labo from './pages/Labo'

function App() {

  return (
    <Routes>
        {/*je ferai le layout et ou path ici*/}
        <Route path="/labo" element={<Labo />} />
    </Routes>
  )
}

export default App
