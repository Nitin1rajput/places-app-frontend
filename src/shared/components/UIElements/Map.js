import React, { useState, useRef } from "react";

import ReactMapGL, { Marker } from "react-map-gl";
import "./Map.css";
import mapicon from "./mapicon.png";
const Map = (props) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: props.center[1],
    longitude: props.center[0],
    zoom: props.zoom,
    width: "100%",
    height: "100%",
  });
  const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          key={props.id}
          latitude={props.center[1]}
          longitude={props.center[0]}
        >
          <img src={mapicon} alt="mapicon" style={{ width: "20px" }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};
export default Map;
