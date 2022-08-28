import Context from './Context';
import axios from 'axios';
import {useEffect,useState} from 'react';
import {Routes,Route} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navigation from './component/Navigation'
import Home from './component/Home';
import './style.css'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {

  let [disData,setDisData]=useState(null);
  let [datData,setDatData]=useState(null);
  let [selectedState,setSelection]=useState(null);
  let [sNames,setSNames]=useState(null);
  useEffect((e)=>{
  
    axios.get("https://data.covid19india.org/v4/min/data.min.json").then(function(e){
      setDisData(e.data);
      setSNames( statesNameGen(e.data))
    }).catch(function(err){
      console.log(err);
    })
    axios.get("https://data.covid19india.org/v4/min/timeseries.min.json").then(function(e){
      setDatData(e.data)
  }).catch(function(e){
      console.log(e)
  })
   
  },[])
  const statesNameGen=(disData)=>{
    let tmp=Object.keys(disData);
        let stat=["Andaman and Nicobar Islands",
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",'Chandigarh',
        "Chhattisgarh","Delhi","Daman and Diu","Goa","Gujarat","Himachal Pradesh",
        "Haryana","Jharkhand","Jammu and Kashmir","Karnataka","Kerala","Ladakh",
        "Lakshadweep","Maharashtra","Meghalaya","Maniput","Madhya Pradesh","Mizoram",
        "Nagaland","Odisha","Panjab","Puducherry","Rajasthan","Sikkim","Telangana",
        "Tamil Nadu","Tripura","TT","Utter Pradesh","Uttarakhand","West Bengal"];
        let sData=tmp.map((e,i)=>{
            let t=[e,stat[i]];
            return t;
        })
        return sData;
  }
  return (
    <>
    <Context value={{disData,setDisData,datData,setDatData,selectedState,setSelection,sNames}}>
      {/* <Navigation></Navigation> */}
      <Home></Home>
      {/* <Routes>
        <Route path="/" element={<Home></Home>}>

        </Route>
      </Routes> */}
    </Context>

    </>
  );
}

export default App;
