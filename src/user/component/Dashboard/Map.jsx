// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const carListings = [
//   { id: 1, name: "Honda City", location: [19.076, 72.8777], price: "₹8,00,000", city: "Mumbai", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
//   { id: 2, name: "Maruti Swift", location: [23.0225, 72.5714], price: "₹6,00,000", city: "Ahmedabad", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
//   { id: 3, name: "Hyundai Creta", location: [21.1702, 72.8311], price: "₹12,00,000", city: "Surat", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
//   { id: 4, name: "Toyota Innova", location: [28.7041, 77.1025], price: "₹15,00,000", city: "Delhi", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
//   { id: 5, name: "Ford Ecosport", location: [19.2183, 72.9781], price: "₹10,50,000", city: "Mumbai", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
// ];

// const MapComponent = () => {
//   const [filteredCars, setFilteredCars] = useState(carListings);
//   const [searchCity, setSearchCity] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const handleSearch = () => {
//     const filtered = carListings.filter((car) =>
//       car.city.toLowerCase().includes(searchCity.toLowerCase())
//     );
//     setFilteredCars(filtered);
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchCity(value);
    
//     if (value.length > 0) {
//       const filteredSuggestions = carListings
//         .map((car) => car.city)
//         .filter((city, index, self) =>
//           city.toLowerCase().includes(value.toLowerCase()) && self.indexOf(city) === index
//         );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (city) => {
//     setSearchCity(city);
//     setSuggestions([]);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", width: "100vw" }}>
//       <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={searchCity}
//           onChange={handleInputChange}
//           style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//         <button onClick={handleSearch} style={{ padding: "8px 15px", borderRadius: "5px", border: "none", background: "#007bff", color: "white", cursor: "pointer" }}>Search</button>
//       </div>
//       {suggestions.length > 0 && (
//         <ul style={{ border: "1px solid #ccc", padding: "5px", listStyle: "none", background: "white", position: "absolute", zIndex: 1000, width: "200px" }}>
//           {suggestions.map((city, index) => (
//             <li key={index} style={{ cursor: "pointer", padding: "5px" }} onClick={() => handleSuggestionClick(city)}>
//               {city}
//             </li>
//           ))}
//         </ul>
//       )}
//       <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "50vh", width: "50vw", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {filteredCars.map((car) => (
//           <Marker key={car.id} position={car.location}>
//             <Popup>
//               <strong>{car.name}</strong>
//               <br />
//               Price: {car.price}
//               <br />
//               <img src={car.image} alt={car.name} style={{ width: "100px", height: "auto", marginTop: "5px" }} />
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;



// THIS IS A SECOND FUNCNILITY 
// THIS IS SEARCH LOCATION 



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { OpenStreetMapProvider } from "leaflet-geosearch";

// const MapSearch = () => {
//   const [location, setLocation] = useState({ lat: 22.5726, lng: 88.3639 }); // Default location: Kolkata
//   const [searchTerm, setSearchTerm] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const provider = new OpenStreetMapProvider(); // Use OpenStreetMap for online searching

//   // Function to search location and update the map
//   const searchLocation = async () => {
//     if (!searchTerm.trim()) {
//       setErrorMessage("Please enter a location name.");
//       return;
//     }

//     try {
//       const results = await provider.search({ query: searchTerm });
//       if (results.length > 0) {
//         setLocation({ lat: results[0].y, lng: results[0].x });
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Location not found. Try another place.");
//       }
//     } catch (error) {
//       setErrorMessage("Error fetching location. Check your internet connection.");
//     }
//   };

//   // Custom hook to update map center
//   function UpdateMapView({ center }) {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(center, 10);
//     }, [center]);
//     return null;
//   }

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Search Any Location Online</h2>

//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter location name"
//         style={{ padding: "8px", width: "250px", marginRight: "10px" }}
//       />

//       <button onClick={searchLocation} style={{ padding: "8px 15px", cursor: "pointer" }}>
//         Search
//       </button>

//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       <p><b>Latitude:</b> {location.lat} | <b>Longitude:</b> {location.lng}</p>

//       <MapContainer center={[location.lat, location.lng]} zoom={10} style={{ height: "400px", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[location.lat, location.lng]} />
//         <UpdateMapView center={[location.lat, location.lng]} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSearch;




// /THIS IS THIRD MAP
// USE MY NEARASET PRODUCTS SEARCH IN 100 KM

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // 📌 Sample car sale locations (latitude, longitude, name)
// const carSaleLocations = [
//   { id: 1, name: "Car Shop A", lat: 23.0225, lng: 72.5714 }, // Ahmedabad
//   { id: 2, name: "Car Shop B", lat: 22.3039, lng: 70.8022 }, // Rajkot
//   { id: 3, name: "Car Shop C", lat: 21.1702, lng: 72.8311 }, // Surat
//   { id: 4, name: "Car Shop D", lat: 19.0760, lng: 72.8777 }, // Mumbai
// ];

// const UpdateMapView = ({ center }) => {
//   const map = useMap();
//   map.setView(center, 12); // Increased zoom level for better visibility
//   return null;
// };

// const getDistance = (lat1, lng1, lat2, lng2) => {
//   const R = 6371; // Radius of the Earth in km
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLng = ((lng2 - lng1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const CarSalesMap = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [searchLocation, setSearchLocation] = useState("");
//   const [filteredLocations, setFilteredLocations] = useState([]);

//   // 📌 Get User's Location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });
//       },
//       (error) => console.error("Error getting location:", error),
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       const nearbyLocations = carSaleLocations.filter((shop) =>
//         getDistance(userLocation.lat, userLocation.lng, shop.lat, shop.lng) <= 100
//       );
//       setFilteredLocations(nearbyLocations);
//     }
//   }, [userLocation]);

//   const handleSearch = () => {
//     alert(`Searching for ${searchLocation} (Functionality to be implemented)`);
//   };

//   return (
//     <div style={{ width: "90%", height: "80vh", margin: "20px auto" }}>
//       {/* Search Bar & Track Button */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Search location..."
//           value={searchLocation}
//           onChange={(e) => setSearchLocation(e.target.value)}
//           style={{ padding: "10px", width: "70%" }}
//         />
//         <button onClick={handleSearch} style={{ padding: "10px", marginLeft: "10px" }}>Search</button>
//         <button
//           onClick={() => navigator.geolocation.getCurrentPosition((pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }))}
//           style={{ padding: "10px", marginLeft: "10px" }}
//         >Track My Location</button>
//       </div>
      
//       {userLocation && (
//         <MapContainer
//           center={[userLocation.lat, userLocation.lng]}
//           zoom={100} // Adjusted zoom level for better visibility
//           style={{ height: "100%", width: "100%" }}
//         >
//           <UpdateMapView center={[userLocation.lat, userLocation.lng]} />
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           {/* User's Location Marker */}
//           <Marker position={[userLocation.lat, userLocation.lng]}>
//             <Popup>📍 You are here!</Popup>
//           </Marker>

//           {/* Display Car Sale Shops within 100km */}
//           {filteredLocations.map((shop) => (
//             <Marker key={shop.id} position={[shop.lat, shop.lng]}>
//               <Popup>🚗 {shop.name}</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       )}
//     </div>
//   );
// };

// export default CarSalesMap;

// forth


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { OpenStreetMapProvider } from "leaflet-geosearch";

// const MapSearch = () => {
//   const [location, setLocation] = useState({ lat: 22.5726, lng: 88.3639 }); // Default: Kolkata
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const provider = new OpenStreetMapProvider();

//   // Fetch location suggestions
//   const handleSearchChange = async (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);
    
//     if (query.length > 2) {
//       try {
//         const results = await provider.search({ query });
//         console.log(results)
//         setSuggestions(results);
//       } catch (error) {
//         setSuggestions([]);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Select a location from suggestions
//   const selectLocation = (lat, lng, name) => {
//     setLocation({ lat, lng });
//     setSearchTerm(name);
//     setSuggestions([]);
//   };

//   // Custom hook to update map center
//   function UpdateMapView({ center }) {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(center, 10);
//     }, [center]);
//     return null;
//   }

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Search Any Location Online</h2>

//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         placeholder="Enter location name"
//         style={{ padding: "8px", width: "250px", marginRight: "10px" }}
//       />
      
//       <div style={{ position: "relative", width: "250px", marginBottom: "100px" }}>
//         {suggestions.length > 0 && (
//           <ul style={{
//             listStyle: "none",
//             padding: "5px",
//             margin: 0,
//             background: "#fff",
//             position: "absolute",
//             width: "100%",
//             border: "1px solid #ccc",
//             zIndex: 10,
//           }}>
//             {suggestions.map((place, index) => (
//               <li
//                 key={index}
//                 onClick={() => selectLocation(place.y, place.x, place.label)}
//                 style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
//               >
//                 {place.label}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       <p><b>Latitude:</b> {location.lat} | <b>Longitude:</b> {location.lng}</p>

//       <MapContainer center={[location.lat, location.lng]} zoom={10} style={{ height: "400px", width: "50%", left:"500px" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[location.lat, location.lng]} />
//         <UpdateMapView center={[location.lat, location.lng]} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSearch;
//fifth

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const MapSearch = ({location, setlocation}) => {
  // const [location, setLocation] = useState({ lat: 22.5726, lng: 88.3639 }); // Default: Kolkata
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");

  const provider = new OpenStreetMapProvider();

  const countries = ["India", "USA", "UK", "Canada", "Australia"];

  // Fetch location suggestions within the selected country
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    
    if (query.length > 2) {
      try {
        const results = await provider.search({ query });
        const filteredResults = results.filter(place => place.label.includes(selectedCountry));
        
        if (filteredResults.length > 0) {
          setSuggestions(filteredResults);
          setErrorMessage("");
        } else {
          setSuggestions([]);
          setErrorMessage("Location not found in selected country.");
        }
      } catch (error) {
        setSuggestions([]);
        setErrorMessage("Error fetching location. Check your internet connection.");
      }
    } else {
      setSuggestions([]);
    }
  };

  // Select a location from suggestions
  const selectLocation = (latitude, longitude, name) => {
    setlocation({ latitude, longitude});
    setSearchTerm(name);
    setSuggestions([]);
  };

  // Custom hook to update map center
  function UpdateMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 10);
    }, [center]);
    return null;
  }

  return (
    <div>

      <h2 className="mb-1 text-center text-xl font-semibold">set location</h2>
      <div className="flex justify-center items-center mb-5 border-2 border-gray-700">
      <select 
        value={selectedCountry} 
        onChange={(e) => setSelectedCountry(e.target.value)}
        className=" mr-5 h-auto w-[20%] p-1 border-2 border-gray-300"
      >
        {countries.map((country, index) => (
          <option key={index} value={country}>{country}</option>
        ))}
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter location name"
        className="border-2 border-gray-300 p-1 w-[80%] "
      />
      </div>
      <div className="w-[100%] mb-auto text-center">
        {suggestions.length > 0 && (
          <ul style={{
            listStyle: "none",
            padding: "5px",
            margin: 0,
            background: "#fff",
            // position: "absolute",
            width: "100%",
            border: "1px solid #ccc",
            zIndex: 10,
          }}>
            {suggestions.map((place, index) => (
              <li
                key={index}
                onClick={() => selectLocation(place.y, place.x, place.label)}
                style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
              >
                {place.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {/* <p><b>Latitude:</b> {location.lat} | <b>Longitude:</b> {location.lng}</p> */}
      {/* <div className="h-[200px] w-[50%] rounded-[30px] ml-[25%]">
      <MapContainer center={[location.latitude, location.longitude]} zoom={10}  style={{ height: "200px", width: "100%" }} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]} />
        <UpdateMapView center={[location.latitude, location.longitude]} />
      </MapContainer>
      </div> */}
    </div>
  );
};

export default MapSearch;

// sixth

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { OpenStreetMapProvider } from "leaflet-geosearch";

// const MapSearch = () => {
//   const [location, setLocation] = useState({ lat: 22.5726, lng: 88.3639 }); // Default: Kolkata
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("India");

//   const provider = new OpenStreetMapProvider();

//   const countries = ["India", "USA", "UK", "Canada", "Australia"];

//   // Fetch location suggestions within the selected country
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchTerm.length > 2) {
//         try {
//           const results = await provider.search({ query: searchTerm });
//           const filteredResults = results.filter(place => place.label.includes(selectedCountry));
          
//           if (filteredResults.length > 0) {
//             setSuggestions(filteredResults);
//             setErrorMessage("");
//           } else {
//             setSuggestions([]);
//             setErrorMessage("Location not found in selected country.");
//           }
//         } catch (error) {
//           setSuggestions([]);
//           setErrorMessage("Error fetching location. Check your internet connection.");
//         }
//       } else {
//         setSuggestions([]);
//       }
//     };

//     fetchSuggestions();
//   }, [searchTerm, selectedCountry]);

//   // Select a location from suggestions
//   const selectLocation = (lat, lng, name) => {
//     setLocation({ lat, lng });
//     setSearchTerm(name);
//     setSuggestions([]);
//   };

//   // Custom hook to update map center
//   function UpdateMapView({ center }) {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(center, 10);
//     }, [center]);
//     return null;
//   }

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Search Any Location Online</h2>

//       <select 
//         value={selectedCountry} 
//         onChange={(e) => setSelectedCountry(e.target.value)}
//         style={{ padding: "8px", marginBottom: "10px" }}
//       >
//         {countries.map((country, index) => (
//           <option key={index} value={country}>{country}</option>
//         ))}
//       </select>

//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter location name"
//         style={{ padding: "8px", width: "250px", marginRight: "10px" }}
//       />
      
//       <div style={{ position: "relative", width: "250px", margin: "auto" }}>
//         {suggestions.length > 0 && (
//           <ul style={{
//             listStyle: "none",
//             padding: "5px",
//             margin: 0,
//             background: "#fff",
//             position: "absolute",
//             width: "100%",
//             border: "1px solid #ccc",
//             zIndex: 10,
//           }}>
//             {suggestions.map((place, index) => (
//               <li
//                 key={index}
//                 onClick={() => selectLocation(place.y, place.x, place.label)}
//                 style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
//               >
//                 {place.label}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       <p><b>Latitude:</b> {location.lat} | <b>Longitude:</b> {location.lng}</p>

//       <MapContainer center={[location.lat, location.lng]} zoom={10} style={{ height: "400px", width: "30%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <Marker position={[location.lat, location.lng]} />
//         <UpdateMapView center={[location.lat, location.lng]} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapSearch;
