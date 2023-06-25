import './App.css';
import { ChartComponent } from './components/ChartComponent';
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newData = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
      setData(newData.data);
    } catch(err) {
      console.log(err);
    }
  }

  // Demo data to visualize the working of lightweight charts without making api calls
  // const initialData = [
  //   { time: '2018-12-22', value: 32.51 },
  //   { time: '2018-12-23', value: 31.11 },
  //   { time: '2018-12-24', value: 27.02 },
  //   { time: '2018-12-25', value: 27.32 },
  //   { time: '2018-12-26', value: 25.17 },
  //   { time: '2018-12-27', value: 28.89 },
  //   { time: '2018-12-28', value: 25.46 },
  //   { time: '2018-12-29', value: 23.92 },
  //   { time: '2018-12-30', value: 22.68 },
  //   { time: '2018-12-31', value: 22.67 },
  // ];

  return (
    <div id="charts">
		  <ChartComponent data={data}></ChartComponent>
    </div>
  );
}

export default App;