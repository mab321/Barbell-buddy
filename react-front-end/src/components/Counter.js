import React, { useContext, useState } from 'react';
import CounterListItem from './CounterListItem';
import "./Counter.css"

import { Link, useParams } from "react-router-dom"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


import ExerciseContext from './ExerciseContext';
import BottomNav from './BottomNav';
import Nav from './Nav';
import { makeStyles, Paper, Box, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  saveButton: {
    color: "black",
    backgroundColor: "LimeGreen"
  },
  root: {
    "& > *": {
      margin: "auto",
      width: "70%",
      height: "auto"
    }
  },
  sets: {
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center"
  },
  inputs: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Counter(props) {

  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [completed, updateCompleted] = useState([]);
  const {exercises,day2, setDay2, state,addDateWorkout} = useContext(ExerciseContext);

  const params = useParams();
  console.log("state exercises", state.exercises);
  
  const exercise = state.exercises.find((item) => item.id == params.id)
  console.log("chosen exercise", exercise);
  const classes = useStyles();

  const updateRep = function (rep, weight) {
    if (!rep && !weight) {
      return;
    }
    setReps(rep);
    setWeight(weight);
  }

  const completeSet = function (set) {
    updateCompleted([...completed, set])
  }
  const addCompleteEx = function() {
    const userID = 1;
    for (const set of completed) {
      addDateWorkout(userID, day2, exercise.id, set.reps, set.weight);
     
    }
  }


  return (
    <section>
      <Nav />
      <div className='inner-content'>

        <div style={{ display: "flex", padding: "5% 0 0 5%" }}>
          <Link to="/exercises">
            <KeyboardBackspaceIcon style={{ color: "black" }} />
          </Link>
        </div>

        <h2 style={{ marginTop: 0 }} >{exercise.type}</h2>

        <Link to="/platecalc">
          <button className="button-85"  >Plate Calculator</button>
        </Link>

        <form style={{ padding: 10 }} autoComplete='off' onSubmit={event => event.preventDefault()}>
          <div className={classes.inputs} >
            <div style={{ paddingRight: 50 }}>
              <label htmlFor="weight">WEIGHT (lbs):</label><br />
              <input size="5" type="text" id="weight" name="weight" onChange={(event) => updateRep(reps, event.target.value)} />
            </div>
            <div>
              <label htmlFor="reps">REPS:</label><br />
              <input size="5" type="text" id="reps" name="reps" onChange={(event) => updateRep(event.target.value, weight)} />
            </div>
          </div>
          <button onClick={() => completeSet({ reps, weight })} className="button-29" >SET DONE</button>
        </form>

        <div className={classes.root}>
          <Paper className={classes.sets} elevation={5}>
            <Box p={1}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}>
                <h3>Completed Sets:</h3>
                <EditIcon style={{ paddingLeft: 10 }} ></EditIcon>
              </div>
              <ul style={{ listStyleType: "none", paddingInlineStart: 0 }} >
                {completed.map((set, index) => <CounterListItem key={index} index={index + 1} rep={set.reps} weight={set.weight} />)}
              </ul>
            </Box>
          </Paper>
        </div>

        <div className="saveButton" style={{ position: "fixed", right: "10px", bottom: "70px", }} >
           <Link to={`/day/${day2}`} >
          <Fab variant="extended" size="small" aria-label="SAVE" className={classes.saveButton} onClick={() => addCompleteEx() } >
            <DoneIcon /> SAVE
          </Fab>
          </Link>
        </div>

      </div>
      <BottomNav />
    </section>
  );

}

export default Counter;