import { Fragment } from "react";
import { Link } from "react-router-dom";
import Hero from "../hero/Hero";
import Featured from "../featured/Featured";
import NewsLetter from "../newsletter/NewsLetter";
import styles from "./Home.module.css";


function Home() {
  return (
    <Fragment>
      <section className={styles["section-hero"]}>
        <Hero />
      </section>
      <div className={styles["feature-products--title"]}>
        <h3>Featured Products</h3>
      </div>
      <section className={styles["section-featured"]}>
        <Featured />
      </section>
      <div className={styles['all-products']}>
      <Link to='/products'>all products</Link>
    </div>
    <section className={styles['section-newsletter']}>
        <NewsLetter />
    </section>
    </Fragment>
  );
}
export default Home;
