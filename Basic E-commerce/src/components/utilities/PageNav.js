import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav(props) {
  return (
    <section className={styles.pagenav}>
      <h3>
        <Link to="/" >Home</Link>/<span>{props.nav}</span>
      </h3>
    </section>
  );
}
export default PageNav;