import "./Card.scss";
import { GlobalContext } from '../../Context';
import {useEffect,useContext} from 'react';
import {NumericFormat} from "react-number-format";
import Skeleton from '@mui/material/Skeleton';

const CountryCard = () => {
  let {caseCount}=useContext(GlobalContext);
  useEffect((e)=>{
   if(caseCount){
   console.log(caseCount)
   }

  },[])

  return (
    <>
      <h1 className='countryName'>Bharat</h1>
    <div className="covidData">
       <div className="cElm">
          <h6 style={{color:"#BC4749"}}>Total Cases</h6>
          {(caseCount)?<NumericFormat
        value={caseCount?.summary.total}
        displayType={"text"}
        thousandSeparator={true}
        className="numFormat"
      />: <Skeleton />}
          
          <p>+132<i className="ri-arrow-up-line" style= {{color:"#BC4749"}}></i></p>

       </div>
       <div className="cElm">
          <h6 style={{color:"#a7c957"}}>Recovered</h6>
          {
            (!caseCount)? <Skeleton />:
            <NumericFormat
            value={caseCount?.summary.discharged}
            displayType={"text"}
            thousandSeparator={true}
            className="numFormat"
          />
          }
         
          <p>-232<i className="ri-arrow-down-line" style= {{color:"#a7c957"}} ></i></p>

       </div>
       <div className="cElm">
          <h6 style={{color:"#5E503F"}}>Death</h6>
          {(!caseCount)? <Skeleton />: <NumericFormat
        value={caseCount?.summary.deaths}
        displayType={"text"}
        thousandSeparator={true}
        className="numFormat"
      />}
         
       <p>+80<i className="ri-arrow-up-line" style= {{color:"#BC4749"}}></i></p>

       </div>
    </div>
    </>
  
  )
}

export default CountryCard