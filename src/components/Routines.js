import { useEffect, useState } from "react";
import { Route } from "react-router";

import BASE_URL from "./utils";
import AddRoutine from "./AddRoutine";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);

  const [routineId, setRoutineId] = useState("");
  // const history = useHistory();
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");
  // };
  const fetchRoutines = async () => {
    await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setRoutines(result);
      })
      .catch(console.error);
  };

  const deleteRoutine = async () => {
    const resp = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = resp.json();
    fetchRoutines(info);
  };
  useEffect(() => {
    fetchRoutines();
  }, []);
  return (
    <div>
      {props.user && (
        <>
          <Route to="/routines">
            <AddRoutine
              routines={routines}
              token={props.user.token}
              setRoutines={setRoutines}
            />
          </Route>
        </>
      )}

      {routines.map((routine) => {
        return (
          <>
            <div key={routine._id}>
              <h3>NAME: {routine.name}</h3>
              <br></br>
              <b>GOAL: {routine.goal}</b>
              <br></br>
              <b>BY: {routine.creatorName}</b>
              <br></br>
              <button
                onClick={() => {
                  setRoutineId(routine._id);
                  deleteRoutine(routineId);
                }}
              >
                DELETE ROUTINE
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Routines;
