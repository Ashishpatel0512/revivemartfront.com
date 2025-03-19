import { useState } from "react";
import { Link } from "react-router-dom";
 
function Dropdown({form,setform,uploadform,setuploadform,updateform,setupdateform}){
    const [display,setdisplay]=useState(true);
   const rotate=`h-[35px] w-[35px]  rounded-[10px] ${display?"rotate-180 duration-1000 bg-white	":" bg-slate-500 rotate-90 duration-1000"}`
    const style="bg-zinc-500 rounded-[10px] text-center text-[1.7vw] text-white inline-block w-[15vw] font-medium m-1 mt-3 hover:bg-black hover:text-white"
    const pstyle=`bg-zinc-700  fixed rounded-[10px] top-[80px] right-[10px] inline-block w-[18vw] p-2 text-black mt-[40px] ${display?"hidden":""}`
    return (
    <>
    <button onClick={()=>{
        setdisplay(!display)
    }} className="fixed top-[78px] right-[10px]"><img src="https://clipground.com/images/navbar-png-6.png" alt="" className={rotate} /></button>
    <div className={pstyle}>
        <button className={style} onClick={()=>{setupdateform(!updateform)}} >Edit Profile</button> <br />
        <button className={style} onClick={()=>{
            setuploadform(!uploadform)
        }} >Edit Dp</button> <br />
        <button className={style} onClick={()=>{
            setform(!form)
        }} >Add Post</button> <br />
        <Link to={"/logout"} className={style} >Logout</Link> <br />
        
    </div>
    </>
   )
}

export default Dropdown;