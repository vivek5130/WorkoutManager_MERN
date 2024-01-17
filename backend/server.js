require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
// express app
const app = express()

// middleware
app.use(express.json())
//  it is necessary to parse that JSON data into a JavaScript object that can be easily accessed in your route handlers.

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
  //using next we can enter to next middleware after executing the current one
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes )
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })