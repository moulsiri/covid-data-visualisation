import { ConnectingAirportsOutlined } from '@mui/icons-material';
import React, { useEffect, useState,useContext } from 'react'
import { Chart } from "react-google-charts";
import { GlobalContext } from '../Context'
const ChartView = () => {
   let {datData,selectedState}=useContext(GlobalContext);
   let [grahData,setGraphData]=useState(null);
   let [selectType,setSelectType]=useState(null);
   let [selectedType,setSelectedType]=useState(null);
   let [completeData,setCompleteData]=useState(null);
   let [dates,setDates]=useState(null);
   let [from,setFrom]=useState(0);
   let [color,setColor]=useState("Black");


   useEffect(()=>{
    if(selectedState){
      // console.log(selectedState)
      setCompleteData(datData[selectedState].dates)
    
      let obj=datData[selectedState].dates
      let data=Object.keys(datData[selectedState].dates).reverse() //dates array
      setDates(data);
      let total=[];
      let limit=data.length -7;
      if(obj[data[from]].total){
        let tmp=obj[data[from]].total
        total=Object.keys(tmp)
      }
      let selectionChoice={}
    for(let i=0;i<total.length;i++){
      if(total[i]==='confirmed'){
        selectionChoice[total[i]]="red";
      }else if(total[i]==='deceased'){
        selectionChoice[total[i]]="grey";
      }else if(total[i]==='recovered'){
        selectionChoice[total[i]]="green";
      }else if(total[i]==='tested'){
        selectionChoice[total[i]]="orange";
      }else if(total[i]==='vaccinated1'){
        selectionChoice[total[i]]="yellow";
      }else if(total[i]==='vaccinated2'){
        selectionChoice[total[i]]="blue";
      }else{
        selectionChoice[total[i]]="black";
      }
    }

    setSelectType(selectionChoice);
    

    }
   
},[selectedState])


   const options = {
    colors: [color],
    legend:false
  };
 const selectionHandler=(e)=>{
    let data=[["Dates",`${e.target.value}`]];
    for(let i=from;i<from+9;i++){
      if(completeData[dates[i]].total){
      let t=[];
        data.push([dates[i],completeData[dates[i]].total[e.target.value]])
        // console.log(completeData[dates[i]].total[e.target.value])
      }
    }
    setGraphData(data);
    setColor(selectType[e.target.value])

 }

let graph=<div className="card w-75" aria-hidden="true">
<div className="card-body">
  <h5 className="card-title placeholder-glow">
    <span className="placeholder col-6"></span>
  </h5>
  <p className="card-text placeholder-glow">
    <span className="placeholder col-7"></span>
    <span className="placeholder col-4"></span>
    <span className="placeholder col-4"></span>
    <span className="placeholder col-6"></span>
    <span className="placeholder col-8"></span>
  </p>
  <a href="#" className="btn btn-primary disabled placeholder col-6"></a>
</div>
</div>

// let graph=<p>hello</p>
if(grahData){
graph= <Chart
chartType="Line"
width="100%"
height="200px"
data={grahData}
options={options}
/>
}
  let sType=<option>loading..</option>;
if(selectType){
  sType=Object.keys(selectType).map((e,i)=>{
    return <option key={i} value={e}>{e}</option>
  })
}
  return (
    <div id="graphContainer" className='container w-50 d-flex flex-column  align-items-start'>
       <select className="form-select" aria-label="Default select example" onChange={selectionHandler}>
       <option defaultValue>Select Type</option>
        {sType}
      </select>
      <div className="m-5 w-100">
      {graph}
      </div>
     
   


    </div>
  )
}

export default ChartView