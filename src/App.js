import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import MainTable from './components/MainTable/MainTable';
import Popup from './components/Popup/Popup';
import tableData from './mock/table-data';


const App = () => {
  const [data, setData] = useState(tableData);
  const [tableCell, setTableCell] = useState(null);

  const addNewValue = (newValue) => {
    let {name, year, prop} = tableCell;
    let newData = data;

    newData[name].G[year][prop].value = newValue;
    
    setData(newData);
  }

  return (
    <Routes>
      <Route path="/" element={
        <MainTable 
          data={data} 
          addTableCell={(name, year, prop) => setTableCell({name, year, prop})}
        />}
      />
      <Route path="popup/:selectedValue" element={<Popup addNewValue={addNewValue}/>}/>
    </Routes>
  )
}

export default App;
