const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controller/workoutController');

//requier auth for all wourkout routes
const requireAuth = require('../middlewares/requireAuth')
router.use(requireAuth)

router.get('/' , getWorkouts);

router.get('/:id' , getSingleWorkout);

router.post('/' , createWorkout);

router.delete('/:id' , deleteWorkout);

router.patch('/:id' , updateWorkout);

module.exports = router;