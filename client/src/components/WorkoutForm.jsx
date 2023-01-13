import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext"
const WorkoutForm = () => {
  const {user} = useAuthContext()
  const {dispatch} = useWorkoutsContext()
  const [title , setTitle] = useState('')
  const [load , setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [err, setErr] = useState(null)
  const [emptyFields , setEmptyFields] = useState([])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!user){
      setErr('You must login')
      return
    }
    const workout = {title , load , reps};
    const response = await fetch('/api/workouts' , {
      method : 'POST',
      body: JSON.stringify(workout),
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' :  `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(!response.ok){
      setErr(json.error)
      setEmptyFields(json.emptyFields)
    }else{
      setTitle('')
      setLoad('')
      setReps('')
      setErr(null)
      setEmptyFields([])
      console.log('new workout added : ' , json)
      dispatch({type : 'CREATE_WORKOUT' , payload : json})
    }
  }
  return ( 
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      {err && <div className="error">{err}</div> }
      
      <label htmlFor="title">Exercise Name :</label>
      <input type="text" 
              onChange={(e) =>{
                setTitle(e.target.value)
              }}
              value = {title}
              className = {emptyFields.includes('title') ? 'error' : ''}
        />
      <label htmlFor="load">Load Value :</label>
      <input type="number" 
              onChange={(e) =>{
                setLoad(e.target.value)
              }}
              value = {load}
              className = {emptyFields.includes('load') ? 'error' : ''}
        />
      <label htmlFor="reps">Repetation :</label>
      <input type="number" 
              onChange={(e) =>{
                setReps(e.target.value)
              }}
              value = {reps}
              className = {emptyFields.includes('reps') ? 'error' : ''}
        />
        <button>Add Workout</button>
    </form>
   );
}
 
export default WorkoutForm;