import { Fragment } from "react";
import styles from "./Hero.module.css";
import Logo1 from '../../assets/images/hero-bcg.jpeg';
import Logo2 from '../../assets/images/hero-bcg-2.jpeg';

function Hero() {
  return (
    <Fragment>
      <div className={styles['hero-texts']}>
        <h1>Design Your<br/> Comfort Zone</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
        <button>shop now</button>
      </div>
      <div className={styles.images}>
        <img src={Logo1} className={styles.img1}/>
        <img src={Logo2} className={styles.img2}/>
      </div>
    </Fragment>
  );
}
export default Hero;
