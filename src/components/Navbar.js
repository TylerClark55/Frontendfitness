import { Link } from "react-router-dom";

const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setUser(null);
  };
  return (
    <div>
      <Link to="/">Home</Link> |<Link to="/routines">Routines</Link> |
      <Link to="/activities">Activities</Link> |
      {!props.user && (
        <>
          <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
        </>
      )}
      {props.user && (
        <>
          <Link to="/my-routines">MyRoutines</Link> |
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
          <span> Welcome {props.user.username}!</span>
        </>
      )}
    </div>
  );
};

export default Navbar;
