import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={(act) => (act.isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={(act) => (act.isActive ? styles.active : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={(act) => (act.isActive ? styles.active : "")}
          >
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
