import {useState,useContext} from 'react'
import { GlobalContext } from '../Context'

const Select = () => {
    let {disData,sNames,setSelection}=useContext(GlobalContext);

    let fun=(e)=>{
        if(e.target.value!=="Select States")
         setSelection(e.target.value);
      }
    let StateSelect=<option>loading..</option>
    if(sNames){
        StateSelect=sNames.map((e,i)=><option key={i} value={e[0]}>{e[1]}</option>)
    }
   
  return (
    <div className="container w-100">
      <select className="form-select m-4 m-auto" aria-label="Default select example" onChange={fun}>
       <option defaultValue>Select States</option>
        {StateSelect}
      </select>
     
    </div>
  )
}

export default Select