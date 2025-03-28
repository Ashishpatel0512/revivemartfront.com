import React, { useState } from "react";
import { updatesproduct } from "../../services/services";
import { CiSquareRemove } from "react-icons/ci";
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
  const [formData, setFormData] = useState({
    name: editsproduct.name,
    description: editsproduct.description,
    price: editsproduct.price,
    age: editsproduct.age,
    location: editsproduct.location,
    catagory: editsproduct.catagory,
    other: editsproduct.other,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    updatesproduct(editsproduct._id, formData).then((data) => {
      alert(data.SuccessMsg);
      seteditproduct(false);
      seteditsproduct("");
    });
    // you can perform your API call here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4 fixed top-[10vh] left-[35vw]">
        <CiSquareRemove
                className="text-3xl font-bold relative right-5 bottom-16  text-black"
                onClick={() => {
                  seteditproduct(false);
                }}
              />
      <h2 className="text-2xl font-bold mb-4 text-center">Product Form</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Category Select */}
        <select
          name="catagory"
          value={formData.category}
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
  );
};

export default Editproductform;
