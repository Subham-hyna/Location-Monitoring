import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const UserLocation = () => {
    const {name,latitude, longitude} = useParams();

    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user?.role === "USER"){
            navigate("/me")
        }
    },[user, navigate])
  return (
    <div>
    <h2>Location of {name}</h2>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: '700px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            You are here! <br />
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
  </div>
  )
}

export default UserLocation