import { useEffect ,useState} from 'react';
import 'remixicon/fonts/remixicon.css';
import NavBar from './components/nav/NavBar';
import Main from './components/main/Main';
import axios from 'axios';
import Context from './Context';
import {nanoid} from 'nanoid'
function App() {

  let [mapId,setMapId]=useState(null)
  let [dateWise,setDateWise]=useState(null);
  let [districtData,setDistrictData]=useState(null);
  let [caseCount,setCaseCount]=useState(null);
  let [stateNames,setStateNames]=useState(null);
  let [selectedState,setSelectedState]=useState("AP");
  let [selectedDistrict,setSelectedDistrict]=useState('Anantapur');
  useEffect((e)=>{
  apiCall();
  },[])
  const apiCall=async ()=>{
    try{
     
      //district wise data
      let fetchedData1=await axios.get("https://data.covid19india.org/v4/min/data.min.json");
      let Obj=fetchedData1.data
      setDistrictData(fetchedData1.data)
      delete Obj.TT
      setStateNames(statesNameGen(Obj));
      let mapTmp=Object.keys(Obj).map((e)=>[e,`IN-${e}`]);
      setMapId(mapTmp);
       //case count data
       let fetchedData2=await axios.get("https://api.rootnet.in/covid19-in/stats/latest");
       setCaseCount(fetchedData2.data.data);
      //date wise data
      let fetchedData3=await axios.get("https://data.covid19india.org/v4/min/timeseries.min.json");
      setDateWise(fetchedData3.data)


      // let arr=Object.keys(fetchedData1.data);
      //        arr.splice(arr.indexOf("LA"),1)
      //        arr.splice(arr.indexOf("TT"),1)
      //        arr.splice(arr.indexOf("UN"),1)
      //        mapId=arr.map((e)=>{
      //         let {x,y,height,width}=document.getElementById(`IN-${e}`).getBBox();
      //         return {x,y,height,width,miniPoint:Obj[e].total.confirmed/10000};
      //       })
      //        setmapId(mapId)
    
    }catch(err){
      console.log(err);
    }
    
  }
  const statesNameGen=(disData)=>{
    let tmp=Object.keys(disData);
        let stat=["Andaman and Nicobar Islands",
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",'Chandigarh',
        "Chhattisgarh","Delhi","Daman and Diu","Goa","Gujarat","Himachal Pradesh",
        "Haryana","Jharkhand","Jammu and Kashmir","Karnataka","Kerala","Ladakh",
        "Lakshadweep","Maharashtra","Meghalaya","Maniput","Madhya Pradesh","Mizoram",
        "Nagaland","Odisha","Panjab","Puducherry","Rajasthan","Sikkim","Telangana",
        "Tamil Nadu","Tripura","Utter Pradesh","Uttarakhand","West Bengal"];
        let sData=tmp.map((e,i)=>{
            let t=[e,stat[i]];
            return t;
        })
        return sData;
  }

  return (
    <>
    <Context value={{caseCount,
                     stateNames,
                     selectedState,
                     setSelectedState,
                     selectedDistrict,
                     setSelectedDistrict,
                     districtData,
                     dateWise,
                     mapId}}>
    <NavBar></NavBar>
    <Main/>
    </Context>
   
    
    </>
  );
}

export default App;
