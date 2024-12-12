import React, { useEffect } from "react";
import './LocationList.css'; 
import { Link, useParams } from "react-router-dom";
import { getLocationHistory } from "../../redux/actions/locationActions";
import { useDispatch, useSelector } from 'react-redux';

function LocationHistoryPage() {
  const {userId} = useParams();

  const dispatch = useDispatch();
  const { locations } = useSelector(state => state.location);

  useEffect(() => {
    dispatch(getLocationHistory(userId));
  }, [userId,dispatch]);

  return (
    <div className="location-history-page">
      <h1 className="title">Location History of {locations?.length > 0 && locations[0].userId.name}</h1>
      <button onClick={()=>dispatch(getLocationHistory(userId))}>Reload</button>
      <div className="location-list">
        {locations?.map((location, index) => (
          <div className="location-card" key={index}>
            <p className="location-timestamp">Timestamp: {location.createdAt}</p>
            <p className="location-latitude">Latitude: {location.latitude}</p>
            <p className="location-longitude">Longitude: {location.longitude}</p>
            <Link to={`/user/${location.userId.name}/${location.latitude}/${location.longitude}`}>View in Map</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationHistoryPage;
