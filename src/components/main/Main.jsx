import {useEffect,useContext,useState}from 'react';
import './Main.scss'
import Map from '../VisualView/Map';
import CountryCard from '../Data/CountryCard'
import SelectStates from '../Select/SelectStates';
import ChartView from '../VisualView/ChartView';
import { GlobalContext } from '../../Context';
import StateCard from '../Data/StateCard';

const Main = () => {
  const {stateNames,
         selectedState,
         setSelectedState,
         selectedDistrict,
         setSelectedDistrict,
         districtData}=useContext(GlobalContext);
  const [districtList,setDistrictList]=useState([]);
  useEffect((e)=>{
    if(districtData && selectedState){
      let data=Object.keys(districtData[selectedState].districts).map((e)=>[e,e])
      setDistrictList(data)
    }

  },[selectedState,districtData])

  return (
    <main>
        <div id="hero">
            <div id="hlft">
            <Map></Map>
            </div>
            <div id="hrt">
            <div className="hlogo">
               <h1>covid-data</h1>
               <h2>VISUALISATION</h2>
            </div>
            <CountryCard/>
            <SelectStates
            name={"state"}
            selectedItem={selectedState}
            setSelectedItem={setSelectedState}
            List={stateNames}
            
            />
            <SelectStates
             name={"districts"}
             selectedItem={selectedDistrict}
             setSelectedItem={setSelectedDistrict}
             List={districtList}
            />
            </div>
        </div>
        <div id="stateData">
          <div id="slft">
           <ChartView></ChartView>
          </div>
          <div id="srt">
          <StateCard></StateCard>
          </div>

        </div>
    </main>
  )
}

export default Main