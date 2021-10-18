import { useEffect, useState } from "react";
// import { useHistory } from "react-router";
import BASE_URL from "./utils";

const MyRoutines = (props) => {
  const username = props.user.username;
  const UID = props.user.id;
  const [returnedRoutines, setReturnedRoutines] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [routineId, setRoutineId] = useState("");
  // const history = useHistory();

  const getRoutines = async () => {
    const resp = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
    const info = await resp.json();
    setReturnedRoutines(info);
    console.log(info);
  };

  const addRoutine = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        creatorId: UID,
        name: name,
        goal: goal,
        isPublic: true,
      }),
    });
    const info = resp.json();
    setGoal("");
    setName("");
    getRoutines(info);
    // history.push("/routines");
  };
  const deleteRoutine = async (routineId) => {
    const resp = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    });
    const info = resp.json();
    getRoutines(info);
  };

  useEffect(() => {
    getRoutines();
  }, [props.user]);
  return (
    <>
      <form onSubmit={addRoutine} style={{ margin: "20px" }}>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        ></input>
        <br></br>
        <button>ADD ROUTINE</button>
      </form>
      <div>
        {returnedRoutines.map((routine) => {
          return (
            <>
              {routine.isPublic && (
                <div key={routine._id}>
                  <h3>Routine Name: {routine.name}</h3>
                  <br></br>
                  <p>Goal: {routine.goal}</p>
                  <br></br>
                  <p>Creator: {routine.creatorName}</p>
                  <br></br>
                  <button
                    onclick={() => {
                      setRoutineId(routine._id);
                      deleteRoutine(routineId);
                    }}
                  >
                    Delete Routine
                  </button>

                  <div>
                    {routine.activities.map((activity) => {
                      return (
                        <>
                          <h3>Activity</h3>
                          <br></br>
                          <h3>Name: {activity.name}</h3>
                          <br></br>
                          <p>Desc: {activity.description}</p>
                          <br></br>
                          <p>Duration: {activity.duration}</p>
                          <br></br>
                          <p>Count: {activity.count}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};
export default MyRoutines;
