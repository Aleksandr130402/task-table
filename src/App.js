import { Route, Routes } from 'react-router-dom';
import MainTable from './components/MainTable/MainTable';
import Popup from './components/Popup/Popup';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<MainTable/>}/>
      <Route path="popup" element={<Popup />}/>
    </Routes>
  )
}

export default App;
