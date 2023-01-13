const express = require('express');
const env = require('dotenv').config();
const workOutRoutes = require('./routes/workoutRoutes')
const userRoutes = require("./routes/userRoutes")
const mongoose = require('mongoose');

const app = express();

app.use(express.json())

app.use((req , res , next)=>{
  //console.log(req.path , req.method)
  next();
})

app.use('/api/workouts/' ,workOutRoutes);
app.use('/api/user/' ,userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('database connection success')
    app.listen(process.env.PORT , ()=>{
    console.log('listening to port' , process.env.PORT)
    });
  })
  .catch((err)=>{
    console.log(err);
  })
