import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import SidebarButtons from "./SidebarBtn";
import CloseBtn from "./SidebarClose";
import { useSidebar } from "../store/sidebar-context";

function Sidebar() {
  const side=useSidebar();
  return (
    <div className={`${styles.sidebar} ${side.isOpen ? styles.open : ''}`} >
      <div className={styles.closebtn}>
        <CloseBtn />
      </div>
      <nav className={styles.sidenav}>
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
      <SidebarButtons />
    </div>
  );
}
export default Sidebar;
