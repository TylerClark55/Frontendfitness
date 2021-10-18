import { useState } from "react";
// import { useHistory } from "react-router";
import BASE_URL from "./utils";

const AddRoutine = (props) => {
  const token = props.token;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleAddRoutine = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const info = await resp.json();
    if (info.isPublic === true) {
      props.setRoutines([info, ...props.routines]);
    }
  };
  return (
    <>
      <form onSubmit={handleAddRoutine}>
        <input
          placeholder="name"
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
        <input
          type="checkbox"
          defaultChecked={isPublic}
          onChange={() => {
            setIsPublic(!isPublic);
          }}
        ></input>
        <br></br>
        <button type="submit">ADD ROUTINE</button>
      </form>
    </>
  );
};
export default AddRoutine;
