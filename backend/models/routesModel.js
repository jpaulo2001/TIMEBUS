const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
Routes: 
  "_id": ObjectId("..."), 
  "startingPoint": "Start Location", 
  "endingPoint": "End Location", 
  "distance": 10, 
}

*/




const routesSchema = new Schema({
                    startingPoint: {
                                        type: String,
                                        required: true,
                    },
                    endingPoint: {
                                        type: String,
                                        required: true
                    },
                    distance: { 
                                        type: Number, 
                                        required: true },
                    duration: {
                                        type: Timestamp,
                                        required: true
                    },
                    stops: {
                                        type: Array,
                                        required: true
                    },


}, { timestamps: true })
module.exports = mongoose.model('Routes', routesSchema)


