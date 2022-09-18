import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {useEffect,useContext,useState} from 'react'
import { GlobalContext } from '../../Context';
import { Chart } from "react-google-charts";

const ChartView = () => {
    const { dateWise,selectedState}=useContext(GlobalContext);

    let [graphData,setGraphData]=useState(null);
   let [selectType,setSelectType]=useState(null);
   let [completeData,setCompleteData]=useState(null);
   let [dates,setDates]=useState(null);
   let [color,setColor]=useState("Black");
   let [selectedType,setSelectedType]=useState('recovered')
    useEffect((e)=>{
        if(selectedState && dateWise){
            if(selectedState){
                setCompleteData(dateWise[selectedState].dates)
              
                let obj=dateWise[selectedState].dates
                let data=Object.keys(dateWise[selectedState].dates).reverse() //dates array
                setDates(data);
                let total=[];
                if(obj[data[0]].total){
                  let tmp=obj[data[0]].total
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

        }
    },[selectedState,dateWise,selectedType])

    useEffect((e)=>{
        if(selectedState&&dateWise&&selectType){
            graphDataHandler(selectedType)
        }
    },[selectedType,dateWise])
    const options = {
        colors: [color],
        legend:false
      };

      const graphDataHandler=(item)=>{
        let data=[["Dates",`${item}`]];
        for(let i=0;i<9;i++){
          if(completeData[dates[i]].total){
          let t=[];
            data.push([dates[i],completeData[dates[i]].total[item]])
          }
        }
        setGraphData(data);
        setColor(selectType[item])

      }
      const selectionHandler=(e)=>{
       
        setSelectedType(e.target.value)
    
     }
   return(
    <>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`chartType-label`}>Type of data</InputLabel>
        <Select
          labelId={`chartType-label`}
          id={`chartType-id`}
          value={selectedType}
          label={`Select type of data`}
          onChange={selectionHandler}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {(selectType)?
            Object.keys(selectType).map((e,i)=>{
                return <MenuItem key={i} value={e}>{e}</MenuItem>
              }):<MenuItem value="">
              <em>None</em>
            </MenuItem>
          }
         
        </Select>
        <FormHelperText>{`select which Type of data you want to see`}</FormHelperText>
      </FormControl>
      <div className="graphContainer">
      {
        (graphData)?
        <Chart
        chartType="Line"
        width="100%"
        height="30vmax"
        data={graphData}
        options={options}
        />:" "
      }
      </div>
     

    </>
   )
}

export default ChartView