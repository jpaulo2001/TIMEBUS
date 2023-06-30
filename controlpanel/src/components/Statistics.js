import React, { useEffect, useState } from 'react';

const Statistics = () => {
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [stops, setStops] = useState([]);

    useEffect(() => {
        fetchEverything()
    }, []);
    
    const fetchEverything = () => {
        const token = localStorage.getItem('jwt');
        fetch('http://localhost:4000/api/buses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })  .then((res) => res.json())
            .then((data) => setBuses(data))
            .catch((err) => console.log(err));

        fetch('http://localhost:4000/api/routes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })  .then((res) => res.json())
            .then((data) => setRoutes(data))
            .catch((err) => console.log(err));

        fetch('http://localhost:4000/api/schedules',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => res.json())
            .then((data) => setSchedules(data))
            .catch((err) => console.log(err));
        
        fetch('http://localhost:4000/api/stops',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            })
            .then((res) => res.json())
            .then((data) => setStops(data))
            .catch((err) => console.log(err));
    }

    //Draw 4 cards showing some statistics of buses, stops, schedules and routes, such as quantity
    return (
        <div>
        
        </div>
    );
};

export default Statistics;
