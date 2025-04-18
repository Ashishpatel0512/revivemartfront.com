import React, { useState } from "react";
import { updatesproduct } from "../../services/services";
import { CiSquareRemove } from "react-icons/ci";
import Loader from "./Loader";
const images = [
  "https://wallpaperaccess.com/full/155161.jpg",
  "https://www.wallpapersshare.com/img/big/red-mercedes-benz-cars-ultra-hd-laptop-wallpaper.jpg",
  "https://www.freeiconspng.com/uploads/volkswagen-car-png-image-7.png",
];

console.log(images);
const Editproductform = ({
  editproduct,
  seteditproduct,
  editsproduct,
  seteditsproduct,
}) => {
  const [loader, setloader] = useState(false);
  const [formData, setFormData] = useState({
    name: editsproduct.name,
    description: editsproduct.description,
    price: editsproduct.price,
    age: editsproduct.age,
    location: editsproduct.location,
    catagory: editsproduct.catagory,
    other: editsproduct.other,
    image: editsproduct?.image[0]?.url,
    imagetwo: editsproduct?.image[1]?.url,
    imagethree: editsproduct?.image[2]?.url,
    imagefour: editsproduct?.image[3]?.url
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const Changepostimage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  }
  const Changepostimagetwo = (e) => {
    console.log("imagetwo", e.target.files)
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  }
  const Changepostimagethree = (e) => {
    console.log("imagetwo", e.target.files)
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  }
  const Changepostimagefour = (e) => {
    console.log("imagetwo", e.target.files)
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  }
  console.log(formData.image)
  const handleSubmit = (e) => {
    e.preventDefault();
    setloader(true)
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("description", formData.description);
    formdata.append("price", formData.price);
    formdata.append("age", formData.age);
    formdata.append("latitude", formData?.location?.latitude);
    formdata.append("longitude", formData?.location?.longitude);
    formdata.append("catagory", formData.catagory);
    formdata.append("other", formData.other);

    // for (let i = 0; i < postimage.length; i++) {
    formdata.append("image", formData.image);
    formdata.append("imagetwo", formData.imagetwo);
    formdata.append("imagethree", formData.imagethree);
    formdata.append("imagefour", formData.imagefour);

    console.log('formdata is a', formdata.get('image'));
    // }
    updatesproduct(editsproduct._id, formdata).then((data) => {
      alert(data.SuccessMsg);
      setloader(false)
      seteditproduct(false);
      seteditsproduct("");
    });
    // you can perform your API call here
  };

  return (
  <>
    { loader?<Loader /> :
  <div className="h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-80">
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4 fixed top-[10vh] left-[35vw] h-[80%]  overflow-y-auto">
      <CiSquareRemove
        className="text-3xl font-bold fixed top-16 text-white"
        onClick={() => {
          seteditproduct(false);
        }}
      />
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Form</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Category Select */}
        <select
          name="catagory"
          value={formData.catagory}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Books">Books</option>
          <option value="Properties">Properties</option>
          <option value="Sports">Sports</option>
          <option value="Fashion">Fashion</option>
          <option value="Other">Other</option>
        </select>

        {/* Other Select - Only show when category === 'Other' */}

        <select
          name="other"
          value={formData.other}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Other Option</option>
          <option value="Warranty">Warranty</option>
          <option value="Guarantee">Guarantee</option>
          <option value="Warranty-Guarantee">Warranty-Guarantee</option>
          <option value="Not Available">None</option>
        </select>

        <div className="flex justify-between items-center gap-5 mb-3">
          <img src={editsproduct.image[0].url} alt="" className="h-20 w-20" />
          <input type="file" name="image" className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={Changepostimage} />
        </div>

        <div className="flex justify-between items-center gap-5 mb-3">
          <img src={editsproduct.image[1].url} alt="" className="h-20 w-20" />
          <input type="file" name="imagetwo" className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={Changepostimagetwo} />
        </div>

        <div className="flex justify-between items-center gap-5 mb-3">
          <img src={editsproduct.image[2].url} alt="" className="h-20 w-20" />
          <input type="file" name="imagethree" className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={Changepostimagethree} />
        </div>

        <div className="flex justify-between items-center gap-5 mb-3">
          <img src={editsproduct.image[3].url} alt="" className="h-20 w-20" />
          <input type="file" name="imagefour" className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={Changepostimagefour} />
        </div>
        
        <p
          onClick={(e) => {
            navigator.geolocation.getCurrentPosition((pos) =>
              setFormData({
                ...formData,
                location: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
              })
            );
          }}
          className="text-center text-blue-700 flex  items-center	justify-center font-semibold border-2 border-gray-300 mt-5 mb-5"
        >
          <p>use current loction</p>
        </p>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-xl p-2 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
      }
      </>
  );
};

export default Editproductform;
