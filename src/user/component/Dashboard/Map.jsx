import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const carListings = [
  { id: 1, name: "Honda City", location: [19.076, 72.8777], price: "₹8,00,000", city: "Mumbai", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
  { id: 2, name: "Maruti Swift", location: [23.0225, 72.5714], price: "₹6,00,000", city: "Ahmedabad", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
  { id: 3, name: "Hyundai Creta", location: [21.1702, 72.8311], price: "₹12,00,000", city: "Surat", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
  { id: 4, name: "Toyota Innova", location: [28.7041, 77.1025], price: "₹15,00,000", city: "Delhi", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
  { id: 5, name: "Ford Ecosport", location: [19.2183, 72.9781], price: "₹10,50,000", city: "Mumbai", image: "https://purepng.com/public/uploads/large/red-edition-audi-luxury-car-jdc.png" },
];

const MapComponent = () => {
  const [filteredCars, setFilteredCars] = useState(carListings);
  const [searchCity, setSearchCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const filtered = carListings.filter((car) =>
      car.city.toLowerCase().includes(searchCity.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchCity(value);
    
    if (value.length > 0) {
      const filteredSuggestions = carListings
        .map((car) => car.city)
        .filter((city, index, self) =>
          city.toLowerCase().includes(value.toLowerCase()) && self.indexOf(city) === index
        );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setSearchCity(city);
    setSuggestions([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", width: "100vw" }}>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter city"
          value={searchCity}
          onChange={handleInputChange}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 15px", borderRadius: "5px", border: "none", background: "#007bff", color: "white", cursor: "pointer" }}>Search</button>
      </div>
      {suggestions.length > 0 && (
        <ul style={{ border: "1px solid #ccc", padding: "5px", listStyle: "none", background: "white", position: "absolute", zIndex: 1000, width: "200px" }}>
          {suggestions.map((city, index) => (
            <li key={index} style={{ cursor: "pointer", padding: "5px" }} onClick={() => handleSuggestionClick(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "50vh", width: "50vw", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredCars.map((car) => (
          <Marker key={car.id} position={car.location}>
            <Popup>
              <strong>{car.name}</strong>
              <br />
              Price: {car.price}
              <br />
              <img src={car.image} alt={car.name} style={{ width: "100px", height: "auto", marginTop: "5px" }} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;