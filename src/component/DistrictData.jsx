import {useEffect,useContext,useState} from 'react'
import { GlobalContext } from '../Context'

const DistrictData = () => {
    let {disData,selectedState}=useContext(GlobalContext);
    let [district,setDistrict]=useState(null);
    let [districtsData,setDistrictsData]=useState(null);
    let [selectedDis,setSelectedDis]=useState(null)

    useEffect((e)=>{
         let dis=Object.keys(disData[selectedState].districts).map((e)=>e);
         setDistrict(dis);
    },[selectedState])
    let selectionHandler=(e)=>{
        setDistrictsData(disData[selectedState].districts)
        setSelectedDis(e.target.value);
    }
    let disSelect=<option defaultValue>Select Districts</option>
    if(district){
        disSelect=district.map((e,i)=><option  key={i} value={e}>{e}</option>)
    }

    let valueCard= <tr></tr> ;
    if(districtsData){
      valueCard=Object.keys(districtsData[selectedDis].total).map((e,i)=>{
        return   <tr key={i}>
        <th scope="row">{e}</th>
        <td>{districtsData[selectedDis].total[e]}</td>
      </tr>

      })
    }
  return (
    <div id="disContainer" className="container w-25 d-flex flex-column  align-items-start "> 
    <select className="form-select" aria-label="Default select example" onChange={selectionHandler}>
    <option defaultValue>Select Districts</option>
     {disSelect}
   </select> 
   <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Values</th>
    </tr>
  </thead>
  <tbody>
  {
    valueCard
   }
  </tbody>
</table>
  
   
   </div>
  )
}

export default DistrictData