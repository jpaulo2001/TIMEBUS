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
                    name: {
                                        type: String,
                                        required: true,
                    },
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
                                        type: Number,
                                        required: true
                    },
                    stops: {
                                        type: Array,
                                        required: true
                    },
                    ID: {
                                        type: String,
                                        required: true,
                    },
                    
}, { timestamps: true })
module.exports = mongoose.model('busroutes', routesSchema)


