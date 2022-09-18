import {useEffect,useContext,useState} from 'react'
import { GlobalContext } from '../../Context';
import {NumericFormat} from "react-number-format";
import Skeleton from '@mui/material/Skeleton';



const StateCard = () => {
    const {stateNames,selectedState,selectedDistrict,districtData}=useContext(GlobalContext);
    const [stateHeading,setStateHeading]=useState(" ");
    const [statedata,setStateData]=useState(null);
    const [disData,setDisData]=useState(null);
    const [disList,setDisList]=useState(null);
    useEffect((e)=>{
        if(stateNames && selectedState&&districtData){
            let stateList=stateNames.flatMap((e)=>e)
             setStateHeading(stateList[stateList.indexOf(selectedState)+1])
             setStateData(districtData[selectedState].total)
        }
    },[districtData,selectedState])
    useEffect((e)=>{
      if(districtData && selectedDistrict){
           setDisData(districtData[selectedState].districts[selectedDistrict].total)
           setDisList(Object.keys(districtData[selectedState].districts[selectedDistrict].total))
      }
  },[selectedDistrict,districtData])
  return (
    <>
    <h1 className='stateName'>{stateHeading}</h1>
    <div className="sCovidData">
        <div className="sCElm">
        <h6 style={{color:"#BC4749"}}>Total Cases</h6>
        {
          (statedata)?<NumericFormat
        value={statedata?.confirmed}
        displayType={"text"}
        thousandSeparator={true}
        className="numFormat"
      />:<Skeleton/>
        }
          
          <p>+32<i className="ri-arrow-up-line" style= {{color:"#BC4749"}}></i></p>
        </div>
        <div className="sCElm">
        <h6 style={{color:"#a7c957"}}>Recovered</h6>
        {
          (statedata)?<NumericFormat
          value={statedata?.recovered}
          displayType={"text"}
          thousandSeparator={true}
          className="numFormat"
        />:<Skeleton/>
        }
          
          <p>-132<i className="ri-arrow-down-line" style= {{color:"#a7c957"}} ></i></p>
        </div>
        <div className="sCElm">
        <h6 style={{color:"#5E503F"}}>Death</h6>
        {
          (statedata)? <NumericFormat
        value={statedata?.deceased}
        displayType={"text"}
        thousandSeparator={true}
        className="numFormat"
      />:<Skeleton/>
        }
         
      <p>+8<i className="ri-arrow-up-line" style= {{color:"#BC4749"}}></i></p>
        </div>
    </div>
    <div className="districtName">
      <h6>DISTRICT</h6>
      <h2>{selectedDistrict}</h2>
    </div>
    <div className="dCovidData">
       {
          (disList)?disList.map((e,i)=> <div key={i} className="dCElm">
          <h6>{e}</h6>
          <NumericFormat
        value={disData[e]}
        displayType={"text"}
        thousandSeparator={true}
        className="numFormat"
         />
        </div>):" "
        }
    </div>
    </>
  )
}

export default StateCard