import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

interface MapComponentProps {
  center: L.LatLngExpression;
  onLocationChange: (latlng: L.LatLng) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  onLocationChange,
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  function MapEvents() {
    useMapEvents({
      click: (event) => {
        setPosition(event.latlng);
        onLocationChange(event.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    setPosition(null);
  }, [center]);

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {position && (
        <Marker position={position}>
          <Popup>
            موقعیت انتخاب شده: {position.lat.toFixed(5)},{" "}
            {position.lng.toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
