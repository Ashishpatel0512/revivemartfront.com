import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Details from "../../pages/dashboardpage/Details";
import { Link } from "react-router-dom";
import MapSearch from "./Map";
import { FaCaretSquareLeft } from "react-icons/fa";

// 📌 Sample car sale locations (latitude, longitude, name)
const carSaleLocations = [
  { id: 1, name: "Car Shop A", lat: 23.0225, lng: 72.5714 }, // Ahmedabad
  { id: 2, name: "Car Shop B", lat: 22.3039, lng: 70.8022 }, // Rajkot
  { id: 3, name: "Car Shop C", lat: 21.1702, lng: 72.8311 }, // Surat
  { id: 4, name: "Car Shop D", lat: 19.0760, lng: 72.8777 }, // Mumbai
];

const UpdateMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 12); // Increased zoom level for better visibility
  return null;
};

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const CarSalesMap = ({showproduct,setshowproduct}) => {
  const [location, setlocation] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showmap,setshowmap]=useState(true)
 const mapcss=`fixed top-20 left-0 flex ${showmap?"":'hidden'}`
  // 📌 Get User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setlocation({  latitude,  longitude });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const nearbyLocations = showproduct.filter((shop) =>
        getDistance(location.latitude, location.longitude, shop?.location.latitude, shop.location.longitude) <= 100
      );
      setFilteredLocations(nearbyLocations);
      setshowproduct(nearbyLocations)
      setshowmap(true)
    }
    
  }, [location]);

  const handleSearch = () => {
    alert(`Searching for ${searchLocation} (Functionality to be implemented)`);
  };

  return (
    <>
    
    <div>
      {/* Search Bar & Track Button */}
      <div className="grid grid-cols-1 w-[20vw] border-2 border-black fixed top-[12%] right-[10%] bg-sky-100 hidden">
        {/* <input
          type="text"
          placeholder="Search location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ padding: "10px", width: "70%" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px", marginLeft: "10px" }}>Search</button> */}
        <button
          onClick={() => navigator.geolocation.getCurrentPosition((pos) => setlocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }))}
        className=" text-blue-500 text-lg border-b-2 border-gray-300 w-[100%]"
        >Track My Location</button>
        {/* search button */}
        <MapSearch location={location} setlocation={setlocation}/>

      </div>
      
      {location && (
        <div className={mapcss}>
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={100} // Adjusted zoom level for better visibility
          className="h-[100vh] w-[40vw] "
        >
          <UpdateMapView center={[location.latitude, location.longitude]} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Location Marker */}
          <Marker position={[location.latitude,location.longitude]}>
            <Popup>📍 You are here!</Popup>
          </Marker>

          {/* Display Car Sale Shops within 100km */}
          {filteredLocations.map((shop) => (
            <Marker key={shop._id} position={[shop.location.latitude, shop.location.longitude]}>
              <Popup>
                <Link to={`details/${shop._id}`} > <img src={shop.image[0].url} alt={shop.name} style={{ width: "500px", height: "auto", marginTop: "5px" }} /></Link>
                 <h1> {shop.name}</h1>
                </Popup>
            </Marker>
          ))}
        </MapContainer>
        <FaCaretSquareLeft className="text-xl mt-[50vh]"   onClick={()=>{setshowmap(false)}}/>
      </div>
      )}
    </div>
    </>
  );
};

export default CarSalesMap;