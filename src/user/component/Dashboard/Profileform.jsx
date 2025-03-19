import { useState } from "react";
function Profileform({form,setform}) {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postCode, setPostCode] = useState("");
  const [postThumbnail, setPostThumbnail] = useState("");
  const [postimage, setPostImage] = useState("");
  const backindex=` ${form?"z-4 w-[100%] h-[100%] fixed top-[0px] left-[0px] bg-black opacity-85":""}`
  const disply="border-2 w-[90%] m-[10px] border-black inline-block rounded-[5px]";
  const formdisplay=`text-black bg-white inline-block fixed top-[20%] left-[45%] rounded-[5px] pt-7 ${form?"":"hidden z-100"} `
const Changeposttitle=(e)=>{
  setPostTitle(e.target.value)
  console.log(postTitle)
}
const Changepostdescription=(e)=>{
  setPostDescription(e.target.value)
  console.log(postDescription)
}
const Changepostcode=(e)=>{
  setPostCode(e.target.files[0])
}
const Changepostcover=(e)=>{
  setPostThumbnail(e.target.files[0])
}
const Changepostimage=(e)=>{
  e.target.files.length>4?alert("you can upload only 5 images"):
  setPostImage(e.target.files)
}
console.log(postimage)
console.log(postThumbnail)
console.log(postCode)
console.log(localStorage.getItem("token"))
  
  

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
   formData.append('postTitle', postTitle);
    formData.append('postDescription', postDescription);
    formData.append('postcode', postCode);
    formData.append('postcover', postThumbnail);
    for (let i = 0; i < postimage.length; i++) {
      formData.append('postimage', postimage[i]);
    }
   console.log("form",formData.getAll('postimage'))
    const response = await fetch('http://localhost:3000/newpost', {
      method: 'POST',
      headers:{
        "Authorization":localStorage.getItem("token")
    },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      console.log('File uploaded successfully:', result);
      alert("File uploaded successfully");
      setform(false)
    } else {
      console.log('Upload failed:', result);
      alert('Upload failed:')
      setform(false)
    }
  };

  return (
    <>
    <div className={backindex}>
    </div>
    <div className={formdisplay}>
      <form onSubmit={handleFileUpload}>
                    
                    <input type="text" name="posttitle" className={disply} placeholder="enter project title" onChange={Changeposttitle} value={postTitle}/><br /><br />
                    <input type="text" name="postdescription" className={disply} placeholder="enter project description" value={postDescription} onChange={Changepostdescription}/><br /><br />
                    <input type="file" name="postcode" className={disply} accept=".zip" onChange={Changepostcode}/><br /><br />
                    <input type="file" name="postcover" className={disply} onChange={Changepostcover} /><br /><br />
                   <input type="file" name="postimage" className={disply} multiple onChange={Changepostimage}  /><br /><br />
                    <input type="submit" value="submit"  className="bg-emerald-700	text-white text-[20px] rounded-[5px] pt-1 pb-1 pl-5 pr-5 mb-7 hover:bg-emerald-400"/>

        </form>
        </div>
       
    </>

  );
}
export default Profileform;
