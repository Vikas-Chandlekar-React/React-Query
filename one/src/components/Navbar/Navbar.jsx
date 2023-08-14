import { NavLink } from "react-router-dom";

function Navbar() {
  console.count("Navbar");
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/super-heroes">Traditional Super Heroes</NavLink>
        </li>
        <li>
          <NavLink to="/rq-super-heroes">RQ Super Heroes</NavLink>
        </li>
        <li>
          <NavLink to="/rq-parallel">RQ Parallel Queries</NavLink>
        </li>
        <li>
          <NavLink to="/rq-dynamic-parallel">
            RQ Dynamic Parallel Queries
          </NavLink>
        </li>
        <li>
          <NavLink to="/rq-dependent">RQ Dependent Queries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
