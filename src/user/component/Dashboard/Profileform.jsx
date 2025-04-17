import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import MapSearch from "./Map";
import { CiSquareRemove } from "react-icons/ci";
import Loader from "./Loader";

function Profileform({ form, setform }) {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [age, setage] = useState("");
  const [loader, setloader] = useState(false);
  const [location, setlocation] = useState({
    latitude: 23.8191985,
    longitude: 72.544133,
  });
  const [catagory, setcatagory] = useState("");
  const [other, setother] = useState("");
  const [postimage, setPostImage] = useState("");
  const backindex = ` ${
    form
      ? "z-4 w-[100%] h-[100%] fixed top-[0px] left-[0px] bg-black opacity-85"
      : ""
  }`;
  const disply =
    "border-2 w-[90%] h-10 ml-[5%] mt-3 pl-3 border-black  inline-block outline-offset-2 outline-gray-300 focus:outline-2 rounded-[5px]  ";
  const formdisplay = `text-black bg-white inline-block h-[75vh] rounded-[5px] w-[60vw] overflow-y-auto fixed top-[10%] left-[20vw] rounded-[5px] shadow-3xl shadow-black  ${
    form ? "" : "hidden z-100"
  } `;
  const setproductname = (e) => {
    setname(e.target.value);
  };
  const setproductdescription = (e) => {
    setdescription(e.target.value);
  };
  const setproductprice = (e) => {
    setprice(e.target.value);
  };
  const setproductage = (e) => {
    setage(e.target.value);
  };
  const setproductlocation = (e) => {
    setlocation(e.target.value);
  };
  const setproductcatagory = (e) => {
    setcatagory(e.target.value);
  };
  const setproductother = (e) => {
    setother(e.target.value);
  };
  const Changepostimage = (e) => {
    e.target.files.length > 4
      ? alert("you can upload only 5 images")
      : setPostImage(e.target.files);
  };

  console.log(localStorage.getItem("token"));

  console.log("location", location);

  const handleFileUpload = async (event) => {
    setloader(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("age", age);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("catagory", catagory);
    formData.append("other", other);

    for (let i = 0; i < postimage.length; i++) {
      formData.append("image", postimage[i]);
    }
    console.log("form", formData.getAll("postimage"));
    console.log("hello");
    const response = await fetch("http://localhost:3000/newproduct", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      console.log("File uploaded successfully:", result);
      alert("Product uploaded successfully");
      setloader(false);
      setform(false);
    } else {
      console.log("Upload failed:", result);
      alert("Upload failed:");
      setform(false);
    }
  };

  return (
    <>
      {loader ? <Loader/> :
        <div>
          <div className={backindex}></div>
          <div className={formdisplay}>
            <CiSquareRemove
              className="text-3xl relative left-5 top-5 text-black"
              onClick={() => {
                setform(false);
              }}
            />
            <h1 className="text-center font-semibold text-xl">Add product</h1>
            <form onSubmit={handleFileUpload}>
              <input
                type="text"
                name="productname"
                className={disply}
                placeholder="enter product name"
                onChange={setproductname}
                value={name}
                required
              />
              <br />
              <br />
              <input
                type="text"
                name="productdescription"
                className={disply}
                placeholder="enter product description"
                value={description}
                onChange={setproductdescription}
                required
              />
              <br />
              <br />
              <input
                type="number"
                name="price"
                className={disply}
                value={price}
                onChange={setproductprice}
                placeholder="enter price"
                required
              />
              <br />
              <br />
              <input
                type="number"
                name="age"
                className={disply}
                value={age}
                onChange={setproductage}
                placeholder="enter How many years old is the product?"
                required
              />
              <br />
              <br />
              {/* <input type="text" name="location" className={disply} placeholder="enter location" value={location} onChange={setproductlocation}/><br /><br /> */}
              <select
                name="catagory"
                id="catagory"
                className={disply}
                value={catagory}
                onChange={setproductcatagory}
                required
              >
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Books">Books</option>
                <option value="Properties">Properties</option>
                <option value="Sports">Sports</option>
                <option value="Fashion">Fashion</option>
                <option value="Other">Other</option>
              </select>
              <br />
              <select
                name="other"
                id="catagory"
                className={disply}
                value={other}
                onChange={setproductother}
                required
              >
                <option value="Warranty">Warranty</option>
                <option value="Guarantee">Guarantee</option>
                <option value="Warranty-Guarantee">Warranty-Guarantee</option>
                <option value="Not Availble">None</option>
              </select>
              <br />
              <input
                type="file"
                name="image"
                className="border-2 w-[90%] h-10 ml-[5%] mt-3 p-1 border-black inline-block outline-offset-2 outline-gray-300 focus:outline-2 rounded-[5px]  "
                multiple
                onChange={Changepostimage}
                required
              />
              <br />
              <br />

              {/* location */}

              <p className="text-xl text-semibold text-center text-gray-700 border-b-2 border-black">
                Confirm your location
              </p>
              <p
                onClick={(e) => {
                  navigator.geolocation.getCurrentPosition((pos) =>
                    setlocation({
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                    })
                  );
                }}
                className="text-center text-blue-700 flex  items-center	justify-center font-semibold border-2 border-gray-100 mt-5 mb-5"
              >
                <FaLocationCrosshairs className="mr-3" />
                <p>use current loction</p>
              </p>

              <MapSearch location={location} setlocation={setlocation} />

              {/* ^loction */}

              <input
                type="submit"
                value="submit"
                className="bg-emerald-700	text-white text-[20px] rounded-[5px] pt-1 pb-1 pl-5 pr-5 mb-7 ml-[43%] hover:bg-emerald-400"
              />
            </form>
          </div>
        </div>
      }
    </>
  );
}
export default Profileform;
