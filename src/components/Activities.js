import { useEffect, useState } from "react";
// import { useHistory } from "react-router";
import BASE_URL from "./utils";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activityId, setActivityId] = useState("");

  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp);
    const info = await resp.json();
    console.log(info);
    setActivities(info);
  };

  const addActivity = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    });
    console.log(resp);
    setDescription("");
    setName("");
    fetchActivities();
  };

  const deleteActivity = async (activityId) => {
    const resp = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Autorization: `Bearer ${props.token}`,
      },
    });
    const info = resp.json();
    fetchActivities(info);
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <>
      <form onSubmit={addActivity}>
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
          placeholder="descritption"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <br></br>
        <button>ADD ACTIVITY</button>
      </form>
      {activities.map((activity) => {
        return (
          <>
            <div key={activity._id}>
              <h3>NAME: {activity.name}</h3>
              <br></br>
              <b>DESCRIPTION: {activity.description}</b>
              <br></br>
              <button
                onClick={() => {
                  setActivityId(activity._id);
                  deleteActivity(activityId);
                }}
              >
                DELETE ACTIVITY
              </button>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Activities;
