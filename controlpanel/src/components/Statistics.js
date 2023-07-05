import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';


const Statistics = () => {
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [stops, setStops] = useState([]);
    const [availableBuses, setAvailableBuses] = useState(0);
    const [unavailableBuses, setUnavailableBuses] = useState(0);
    const [busData, setBusData] = useState([]);
    const [routeStopData, setRouteStopData] = useState([]);
    const [stopCountData, setStopCountData] = useState([]);




    useEffect(() => {
        fetchEverything();
        calculateAvailableBuses();
        calculateBusCapacities();
    }, [buses]);

    const fetchEverything = () => {
        const token = localStorage.getItem('jwt');
        fetch('http://localhost:4000/api/buses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((data) => setBuses(data))
            .catch((err) => console.log(err));

        fetch('http://localhost:4000/api/routes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((data) => {
                setRoutes(data);
                const chartData = data.map(route => ({
                    routeNumber: route.routeNumber,
                    stopCount: route.stops.length,
                }));
                setRouteStopData(chartData);

                // Calculate stop duplicates
                const stopCounts = {};
                data.forEach(route => {
                    route.stops.forEach(stop => {
                        if (stopCounts[stop]) {
                            stopCounts[stop]++;
                        } else {
                            stopCounts[stop] = 1;
                        }
                    });
                });
                setStopCountData(stopCounts);
            })
            .catch((err) => console.log(err));

        fetch('http://localhost:4000/api/schedules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => setSchedules(data))
            .catch((err) => console.log(err));

        fetch('http://localhost:4000/api/stops', {
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

    const calculateAvailableBuses = () => {
        let available = 0;
        let unavailable = 0;

        buses.forEach(bus => {
            if (bus.isAvailable) {
                available += 1;
            } else {
                unavailable += 1;
            }
        });

        setAvailableBuses(available);
        setUnavailableBuses(unavailable);
    }

    const calculateBusCapacities = () => {
        let data = [];

        buses.forEach(bus => {
            data.push({
                name: bus.busName,
                capacity: bus.capacity
            });
        });

        setBusData(data);
    }

    const pieData = {
        labels: ['Available Buses', 'Unavailable Buses'],
        datasets: [
            {
                data: [availableBuses, unavailableBuses],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',  // Available 
                    'rgba(255, 99, 132, 0.6)'   // Unavailable
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',    // Available
                    'rgba(255, 99, 132, 1)'     // Unavailable
                ],
                borderWidth: 1
            }
        ]
    };

    const barData = {
        labels: busData.map(bus => bus.name),
        datasets: [
            {
                label: 'Capacity',
                data: busData.map(bus => bus.capacity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const routeStopBarData = {
        labels: routeStopData.map(data => data.routeNumber),
        datasets: [
            {
                label: 'Number of Stops',
                data: routeStopData.map(data => data.stopCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const stopPieData = {
        labels: Object.keys(stopCountData),
        datasets: [
            {
                data: Object.values(stopCountData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 20,
                    },
                },
            ],
        },
    };

    const routeStopBarOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    };

    const stopPieOptions = {
        responsive: true,
        legend: {
            display: false,
        },
        cutoutPercentage: 50,
    };

    //Draw 4 cards showing some statistics of buses, stops, schedules and routes, such as quantity
    return (
        <div>
            {/* <ul style={styles.divStats}>
                <li>Number of Schedules: {schedules.length}</li>
                <li>Number of Stops: {stops.length}</li>
            </ul> */}
            <div>
                <ul style={styles.divCharts}>
                    <li><div style={styles.chartLabel}>Total Buses: {buses.length}</div></li>
                    <li><Pie data={pieData} /></li>
                    <li><Bar data={barData} options={options} /></li>
                </ul>
            </div>
            <div>
                <ul style={styles.divCharts}>
                    <li>Total Routes: {routes.length}</li>
                    <li><Pie data={stopPieData} options={stopPieOptions} /></li>
                    <li><Bar data={routeStopBarData} options={routeStopBarOptions} /></li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;

const styles = {
    divCharts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '30%',
        listStyle: 'none',
        borderBottom: '2px solid black',
        marginBottom: '20px',
        paddingBottom: '20px'
    },
    chartLabel: {
    }
}