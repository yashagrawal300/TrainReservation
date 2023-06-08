
import './App.css';
import { useState } from 'react';
import axios from 'axios';
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
    console.log("response", response.data);
      setData(response.data.allocatedSeatNumber);
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
    {data}

    </div>

    
    
    </>

  );
}

export default App;
