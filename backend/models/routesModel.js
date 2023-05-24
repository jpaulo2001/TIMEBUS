const mongoose = require('mongoose')



const Schema = mongoose.Schema


const routesSchema = new Schema({
name: {}, //Name or number of the route
origin: {}, //Origin city or location
destination:{}, //Destination city or location
distance:{}, //Distance in kilometers or miles
duration:{}, //Estimated travel duration
stops: {}, //Array of stops along the route (each stop can have a name, latitude, and longitude)
}, {timestamps: true })
module.exports = mongoose.model('Workout', routesSchema)


