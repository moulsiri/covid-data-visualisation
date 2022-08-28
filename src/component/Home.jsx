import {useContext,useState} from 'react'
import { useEffect } from 'react'
import { GlobalContext} from '../Context'
import Select from './Select'
import ChartView from './ChartView'
import DistrictData from './DistrictData'

const Home = () => {
    let {selectedState,sNames,disData,datData}=useContext(GlobalContext);
    let [state,setState]=useState(null);
    let [sData,setSData]=useState(null);
    useEffect(()=>{
        if(selectedState){
            let t=sNames.flatMap((e)=>e);
            // console.log(t)
            setState(t[t.indexOf(selectedState)+1]);
            setSData(disData[selectedState].total);
        }
       
    },[selectedState])
  return (
    <div className="container d-flex flex-column align-items-center">
        <h1 className='text-center' >Welcome to covid data visualisation 📈</h1>
        <h4 className='text-center'>{(!state)?" ":state}</h4>
        <Select></Select>
        <div className=' mt-3 mb-3 d-flex justify-content-around w-100'>
            <div className="card p-2">
                <h4 className='text-danger'>Total cases</h4>
                <p className='placeholder-glow'>{(sData)?sData.confirmed:<span className="placeholder col-7"></span>}</p>
            </div>
            <div className="card  p-2">
                <h4 className='text-success'>Recovered</h4>
                <p className='placeholder-glow'>{(sData)?sData.recovered:<span className="placeholder col-7"></span>}</p>
            </div>
            <div className="card  p-2">
                <h4 className='text-secondary'>Death</h4>
                <p className='placeholder-glow'>{(sData)?sData.deceased:<span className="placeholder col-7"></span>}</p>
            </div>
        </div>
        <div id="dataContainer" className="w-100 d-flex mt-3">
                {(selectedState)?<ChartView></ChartView>:" "}
                {(selectedState)?<DistrictData/>:" "}
        </div>

    </div>
  )
}

export default Home