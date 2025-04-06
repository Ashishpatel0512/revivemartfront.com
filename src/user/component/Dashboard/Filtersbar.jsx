import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { RiBarChartGroupedLine } from "react-icons/ri";
import TextField from '@mui/material/TextField';
import { CiSliderHorizontal } from "react-icons/ci";


function valuetext(value) {
  return `${value}°C`;
}
export const Filtersbar = ({value, setValue,age,setage,showfilterbar, setShowFiltersbar}) => {
    //  const [value, setValue] = React.useState([20, 37]);
    //  console.log(value)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    };
    const handleage = (event, newValue) => {
        setage(newValue);
      };
  return (
    <div className={`fixed top-[20vh] lg:top-[30vh] z-10 lg:left-[30vw] left-[5vw] bg-white  shadow-xl shadow-black rounded-lg p-5 w-[90vw] lg:w-[40vw]  h-[50vh] overflow-y-scroll ${showfilterbar?"":'hidden'}` }>
        <div>
          <p className="text-2xl font-semibold text-center text-sky-900">
            Filters
          </p><hr />
              <Box className='mt-5'>
                  <p className='text-center text-md font-sanc text-gray-600  mb-5'>Price Range</p>
                  <div className='flex justify-between items-center mb-3'>
                      <TextField id="outlined-basic" label="minprice" variant="outlined" value={value[0]} onChange={(e) => { setValue([Number(e.target.value), value[1]]) }} /> 
                      <CiSliderHorizontal  className='text-2xl font-bold'/>

                      <TextField id="outlined-basic" label="maxprice" variant="outlined"  value={value[1]} onChange={(e)=>{setValue([value[0],Number(e.target.value)])}}/> 

                  </div>
                  <div className='flex ga items-center mb-[-19px] bg-gray-400 bg-opacity-30 rounded-t-lg'>
                      <RiBarChartGroupedLine className={`text-7xl  ${value[0]>100?'text-blue-500 bg-blue-200':'text-white'}`} />
                      <RiBarChartGroupedLine  className={`text-7xl  ${value[0]>200?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${value[0]>300?'text-blue-500 bg-blue-200':'text-white'}`} />
                      <RiBarChartGroupedLine  className={`text-7xl  ${value[1]>400?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine className={`text-7xl  ${value[1]>650?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${value[1]>750?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${value[1]>850?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine className={`text-7xl  ${value[1]>999?'text-blue-500 bg-blue-200':'text-white'}`}  />

                  </div>
         <Slider
           getAriaLabel={() => 'Temperature range'}
                      value={value}
                      min={0}
                      max={1000000}
           onChange={handleChange}
           valueLabelDisplay="auto"
           getAriaValueText={valuetext}
        />
              </Box>
              {/* age filters */}
            <Box className='mt-5'>
                  <p className='text-center text-md font-sanc text-gray-600  mb-5'>age Range</p>
                  <div className='flex justify-between items-center mb-3'>
                      <TextField id="outlined-basic" label="minage" variant="outlined" value={age[0]} onChange={(e) => { setage([Number(e.target.value), age[1]]) }} /> 
                      <CiSliderHorizontal  className='text-2xl font-bold'/>

                      <TextField id="outlined-basic" label="maxage" variant="outlined"  value={age[1]} onChange={(e)=>{setage([value[0],Number(e.target.value)])}}/> 

                  </div>
                  <div className='flex ga items-center mb-[-19px] bg-gray-400 bg-opacity-30 rounded-t-lg'>
                      <RiBarChartGroupedLine className={`text-7xl  ${age[0]>10?'text-blue-500 bg-blue-200':'text-white'}`} />
                      <RiBarChartGroupedLine  className={`text-7xl  ${age[0]>20?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${age[0]>30?'text-blue-500 bg-blue-200':'text-white'}`} />
                      <RiBarChartGroupedLine  className={`text-7xl  ${age[1]>40?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine className={`text-7xl  ${age[1]>65?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${age[1]>75?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine  className={`text-7xl  ${age[1]>85?'text-blue-500 bg-blue-200':'text-white'}`}  />
                      <RiBarChartGroupedLine className={`text-7xl  ${age[1]>99?'text-blue-500 bg-blue-200':'text-white'}`}  />

                  </div>
         <Slider
           getAriaLabel={() => 'Temperature range'}
                      value={age}
                      min={0}
                      max={100}
           onChange={handleage}
           valueLabelDisplay="auto"
           getAriaValueText={valuetext}
        />
            </Box>
          </div>
      </div>
  )
}
