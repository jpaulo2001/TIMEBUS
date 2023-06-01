import React, { useState } from 'react';
import { Source, Layer, Marker } from 'react-map-gl';

function MapComponent() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 5
  });

  const busStops = [
    { latitude: 40.67, longitude: -103.59 },
    // Add more bus stops here
  ];

  const busRoute = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: busStops.map(stop => [stop.longitude, stop.latitude])
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
    >
      {busStops.map((stop, i) => (
        <Marker key={i} longitude={stop.longitude} latitude={stop.latitude}>
          <div style={{ color: 'red' }}>•</div>
        </Marker>
      ))}

      <Source type="geojson" data={busRoute}>
        <Layer
          type="line"
          paint={{
            'line-color': '#888',
            'line-width': 8
          }}
        />
      </Source>
    </ReactMapGL>
  );
}

export default MapComponent;
