const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
Buses: 
{ 
  "_id": ObjectId("..."), 
  "gpslocation": "gpslocation gps x,y,z", 
  "capacity": 50, 

*/


const busSchema = new Schema({
                    number: {
                                        type: String,
                                        required: true,
                    },
                    gpslocation: {
                                        type: String,
                                        required: true,
                    },
                    capacity: {
                                        type: Number,
                                        required: true,
                    }
}, { timestamps: true })
module.exports = mongoose.model('Bus', busSchema)

