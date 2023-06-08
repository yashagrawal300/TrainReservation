
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function renderItem(data){
  const renderedItem = [];
  data.forEach(element => {
    renderedItem.push(
      <tr style={{"border": "1px solid black"}}>
        {element}
      </tr>
    )
    
  });

  return renderedItem;
}



function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputName, setInputName] = useState('');

  const handleValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/addData', {
        "Name": inputName,
        "Seats": inputValue
    });


      setData(renderItem(response.data.allocatedSeatNumber));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/deleteWholeData');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div style={{"padding": 30}}>

    <input type={"text"} placeholder='Enter your name' value={inputName} onChange={handleNameChange}/>
    <p/>
    <input type={'text'} placeholder='Enter the number of seats you want to book' value={inputValue} onChange={handleValueChange}/>
    <p/>

    <input type={"button"} value='Get seats' onClick={fetchData}/>
    <p/>
    <input type={"button"} value='Delete All Seats' onClick={deleteData}/>
<p/>
<table cellPadding={10} cellSpacing={10} border={"1px solid black"}>
{data}
</table>

    </div>

    
    
    </>

  );
}

export default App;
