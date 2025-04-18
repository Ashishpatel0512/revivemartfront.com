import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Details from "../../pages/dashboardpage/Details";
import { Link } from "react-router-dom";
import MapSearch from "./Map";
import { FaCaretSquareLeft } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";


// 📌 Sample car sale locations (latitude, longitude, name)
const carSaleLocations = [
  { id: 1, name: "Car Shop A", lat: 23.0225, lng: 72.5714 }, // Ahmedabad
  { id: 2, name: "Car Shop B", lat: 22.3039, lng: 70.8022 }, // Rajkot
  { id: 3, name: "Car Shop C", lat: 21.1702, lng: 72.8311 }, // Surat
  { id: 4, name: "Car Shop D", lat: 19.076, lng: 72.8777 }, // Mumbai
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

const CarSalesMap = ({ showproduct, setshowproduct, locationtrue ,setlocationtrue}) => {
  const [location, setlocation] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showmap, setshowmap] = useState(true);
  const [zoom,setzoom]=useState(false)
  const mapcss = `fixed top-20 left-0 flex ${zoom ? "w-[100%] h-[100%] pb-10" : "w-[43%] h-[50%] m-10"}  bg-black pt-10 pl-14 rounded-[10px] shadow-xl shadow-gray-500 ${showmap ? "" : "hidden"}`;
  const searchboxcss = `grid grid-cols-1 lg:w-[20vw] lg:h-auto w-screen h-screen lg:rounded-[10px] rounded-0 fixed lg:top-[8%] top-0 lg:right-[10%] right-0 bg-gray-50 shadow-2xl shadow-black z-20 ${
    locationtrue ? "" : "hidden"
  }`;
  // 📌 Get User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setlocation({ latitude, longitude });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const nearbyLocations = showproduct?.filter(
        (shop) =>
          getDistance(
            location?.latitude,
            location?.longitude,
            shop?.location?.latitude,
            shop?.location?.longitude
          ) <= 100
      );
      setFilteredLocations(nearbyLocations);
      setshowproduct(nearbyLocations);
      setshowmap(true);
    }
  }, [location]);

  const handleSearch = () => {
    alert(`Searching for ${searchLocation} (Functionality to be implemented)`);
  };

  return (
    <>
      <div>
        {/* Search Bar & Track Button */}
        
        <div className={searchboxcss}>
        <div><IoMdArrowRoundBack className={"fixed top-5 left-5 text-black text-2xl lg:hidden" } onClick={()=>{setlocationtrue(!locationtrue)}} />
        </div>
          {/* <input
          type="text"
          placeholder="Search location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ padding: "10px", width: "70%" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px", marginLeft: "10px" }}>Search</button> */}
          <MapSearch location={location} setlocation={setlocation} />
          <hr />
          <button
            onClick={() =>
              navigator.geolocation.getCurrentPosition((pos) =>
                setlocation({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                })
              )
            }
            className=" text-blue-500  font-mono text-xl border-b-2  border-gray-300 w-[100%] flex items-center justify-center gap-5 mt-5 pb-5 "
          >
          <MdMyLocation  className="text-black text-2xl"/>
           Track My Location
          </button>
          {/* search button */}
        </div>

        {location && (
          <div className={mapcss}>
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={100} // Adjusted zoom level for better visibility
              className="h-[90%] w-[90%]"
            >
              <UpdateMapView center={[location.latitude, location.longitude]} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* User's Location Marker */}
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>📍 You are here!</Popup>
              </Marker>

              {/* Display Car Sale Shops within 100km */}
              {filteredLocations.map((shop) => (
                <Marker
                  key={shop._id}
                  position={[shop.location.latitude, shop.location.longitude]}
                >
                  <Popup>
                    <Link to={`details/${shop._id}`}>
                      {" "}
                      <img
                        src={shop.image[0].url}
                        alt={shop.name}
                        style={{
                          width: "500px",
                          height: "auto",
                          marginTop: "5px",
                        }}
                      />
                    </Link>
                    <h1 className="font-semibold font-sanc mt-2 text-center"> {shop.name}</h1>
                    <h1 className="font-semibold text-lg text-center"> {shop.price}&#x20b9;</h1>

                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <FaCaretSquareLeft
              className="relative left-4 top-5  text-2xl text-white"
              onClick={() => {
                setshowmap(false);
                setlocation('')
              }}
            />
            <MdZoomOutMap  className="relative right-2 bottom-4  text-2xl text-white" onClick={() => {
                setzoom(!zoom)
              }}/>

          </div>
        )}
      </div>
    </>
  );
};

export default CarSalesMap;
