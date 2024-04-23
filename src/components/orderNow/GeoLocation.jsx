
import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


const GeoLocation =()=>{
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    loaded:false,
    coordinates:{ lat:"", lng:""}
  });
  const [loading, setLoading] = useState(true);

const onSuccess=(location)=>{
  setLocation({
    loaded:true,
    coordinates:{
      lat:location.coords.latitude,
      lng:location.coords.longitude,
    },
  });
 setLoading(false);
  
  navigate('/Home');
}

const onError = error =>{
  setLocation({
    loaded:true,
    error,
  });
  setLoading(false);
}

useEffect(()=>{
  if(!("geolocation" in navigator)){
  onError({
    code:0,
    message:"Geoloaction not supported",
   });
  }
  navigator.geolocation.getCurrentPosition(onSuccess,onError);
},[]);

return (

  <div>
  {loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>Latitude: {location.coordinates.lat}</p>
      <p>Longitude: {location.coordinates.lng}</p>
    </div>
  )}
  {!location.loaded && <div>Loading...</div>}
  {location.error && <div>Error: {location.error.message}</div>}
</div>
);
};

export default GeoLocation