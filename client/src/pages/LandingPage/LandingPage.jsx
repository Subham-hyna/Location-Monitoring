import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getUsers, logout } from '../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const LandingPage = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login")
  }

  const { user, users } = useSelector(state => state.user);

  const requestPermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

        if (permissionStatus.state === 'denied') {
          setError('Location permissions are denied. Please enable them in your browser settings.');
          return;
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setHasPermission(true);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setError('Permission denied. Please enable location permissions.');
            } else {
              setError('An error occurred while accessing location.');
            }
            setHasPermission(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    } catch (err) {
      setError('Unexpected error while requesting location permissions.');
    }
  };

  useEffect(() => {
    if (user?.role === "USER" && hasPermission && location) {
      const interval = setInterval(async () => {
        try {
            let token = localStorage.getItem("Access-Token");
            const config = {
                headers: {
                  'Authorization': `Bearer ${token}` 
                },
                withCredentials: true
            }
          await axios.post('http://127.0.0.1:8000/api/v1/location/addLocation', {userId : user?._id, latitude:location.latitude , longitude:location.longitude},config);
        } catch (err) {
          console.error('Error sending location:', err);
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [hasPermission, location, user]);

  useEffect(()=>{
    if(user?.role === "ADMIN"){
        dispatch(getUsers())
    }
  },[dispatch,user])

  return (
    <>
        {user?.role === "USER" ? <div className="location-container">
      {error && <p className="error">{error}</p>}
      {!hasPermission ? (
        <button onClick={requestPermission} className="permission-button">
          Allow Location Permission
        </button>
      ) : (
        <div>
          <h2>Your Location</h2>
          <button onClick={logoutHandler}>Logout</button>
          {location && (
            <MapContainer
              center={[location.latitude, location.longitude]}
              zoom={15}
              style={{ height: '700px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                  You are here! <br />
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      )}
    </div>
    :
    <>
           <div className="users-page">
      <h1 className="title">Users List</h1>
      <div className="user-list">
        {users?.map((user) => (
          <div className="user-card" key={user.id}>
            <Link to={`/user/${user._id}`} className="user-link">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-id">Username: {user.username}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
    }
    </>
  );
};

export default LandingPage;
