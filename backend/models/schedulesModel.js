const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
Schedules: 

{ 
  "_id": ObjectId("..."), 
  "routeId": ObjectId("..."), 
  "busId": ObjectId("..."), 
  "departureTimes": ["08:00", "10:00", "12:00"], 
*/

const schedulesSchema = new Schema({
                    routeId: {//foreign key from route
                    },
                    busId: {//foreign key from bus
                    },
                    departureTimes: {
                                        type: Array,
                                        required: true,
                    },
}, { timestamps: true })
module.exports = mongoose.model('Schedules', schedulesSchema)

