"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";

 delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

//  markers
const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

function SetViewOnClick({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center]);

  return null;
}

export default function Home() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [isClient, setIsClient] = useState(false);

   useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; 
  }

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={4} className="h-[100vh] w-[100vw]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          eventHandlers={{
            click: () => {
              setActiveMarker(marker.position);
            },
          }}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      {activeMarker && <SetViewOnClick center={activeMarker} />}
    </MapContainer>
  );
}
