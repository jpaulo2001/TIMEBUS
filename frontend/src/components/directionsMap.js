import React, { useEffect } from 'react';

const DirectionsMap = () => {
  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: 'Punctul de plecare',
      destination: 'Destinația',
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const route = response.routes[0];

        for (let i = 0; i < route.legs.length; i++) {
          const leg = route.legs[i];
          console.log('Durată:', leg.duration.text);
          console.log('Distanță:', leg.distance.text);
        }
      } else {
        console.log('Eroare la căutarea rutei:', status);
      }
    });
  }, []);

  return <div id="map"></div>;
};

export default DirectionsMap;
