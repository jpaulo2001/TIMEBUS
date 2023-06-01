import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "../app.css"

class BusTimetable extends Component {
    state = {
        busStops: [
            { name: 'Bus Stop 1', lat: 37.777, lng: -122.411 },
            { name: 'Bus Stop 2', lat: 37.779, lng: -122.415 },
            // Add more bus stops
        ],
    };

    render() {
        const mapStyles = {
            width: '70%',
            height: '70%',
        };

        return (
            <div className="busTimetableContainer">
                <Map
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{ lat: 37.739798, lng: -25.666498 }}
                    style={mapStyles}
                >
                    {this.state.busStops.map((busStop, index) => (
                        <Marker
                            key={index}
                            position={{ lat: busStop.lat, lng: busStop.lng }}
                            title={busStop.name}
                            icon={{
                                url: 'path_to_marker_icon.png',
                                scaledSize: new this.props.google.maps.Size(32, 32),
                            }}
                            onClick={() => {
                                // Handle marker click event
                            }}
                        />
                    ))}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCACoeFYxAZ7TFZz5SssNv0cOqalH-4EUQ',
})(BusTimetable);
