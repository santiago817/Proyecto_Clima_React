import React, { useState } from "react";
import Aside from "./Aside";
import ButtonAside from "./ButtonAside";
import ModalSearch from "./ModalSearch";
import CardAside from "./CardAside";
import Home from "./Home";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [errorLocation, setErrorLocation] = useState(null);

  const handleLocationFound = (locationData) => {
    setErrorLocation(null);

    if (locationData.loc) {
      const [lat, lon] = locationData.loc.split(",");
      setSelectedPlace({
        lat: Number(lat),
        lon: Number(lon),
        city: locationData.city,
        region: locationData.region,
      });
    } else if (locationData.lat && locationData.lon) {
      setSelectedPlace({ lat: locationData.lat, lon: locationData.lon });
    } else {
      setSelectedPlace(locationData);
    }
  };

  const handleLocationError = (msg) => {
    setErrorLocation(msg);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-[30%] h-auto md:h-screen">
        <Aside>
          <ButtonAside
            onSearchClick={() => setIsModalOpen(true)}
            onLocationFound={handleLocationFound}
            onLocationError={handleLocationError}
          />

          <CardAside selectedPlace={selectedPlace} />

          {errorLocation && (
            <p className="text-red-500 mt-2">{errorLocation}</p>
          )}
        </Aside>

        {isModalOpen && (
          <ModalSearch
            closeModal={() => setIsModalOpen(false)}
            onSelectCity={(city) => setSelectedPlace(city)}
          />
        )}
      </div>

      <div className="w-full md:w-[70%] h-auto md:h-screen overflow-y-auto">
        <Home selectedPlace={selectedPlace} />
      </div>
    </div>
  );
}
