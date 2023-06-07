require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const stopRoutes = require('./routes/stops')
const routesRoutes = require('./routes/routes')
const busesRoutes = require('./routes/buses')

const userRoute =  require("./routes/user.route");
const authRoute = require("./routes/auth.route");

const cors = require('cors');

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

// routes
app.use('/api/stops', stopRoutes)
app.use('/api/routes', routesRoutes)
app.use('/api/buses', busesRoutes)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => { 
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })