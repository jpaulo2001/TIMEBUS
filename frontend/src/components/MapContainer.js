import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "../app.css"

class MapContainer extends Component {
    state = {
        busStops: [
            { name: 'Bus Stop 1', lat: 37.747638073710164, lng: -25.666447572839147 },
            { name: 'Bus Stop 2', lat: 37.779, lng: -122.415 },
            // Add more bus stops
        ],
    };

    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };

        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }

        return (
            <div style={style}>
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{lat: 37.738924, lng: -25.668171 }}
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
})(MapContainer);
