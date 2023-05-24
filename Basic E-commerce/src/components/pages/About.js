import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import PageNav from "../utilities/PageNav";
import styles from './About.module.css';

function About(){
    
    const { pathname }=useLocation();
    const loc=pathname.slice(1).trim();
    const nav=loc.charAt(0).toUpperCase()+loc.slice(1);
    return(
        <Fragment>
            <PageNav nav={nav}/>
            <section className={styles.about}>
                <div className={styles['image-container']}>
                    <img src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg" alt=""/>
                </div>
                <div className={styles['texts-container']}>
                    <h3>Our Story</h3>
                    <div className={styles.line}></div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
                </div>
            </section>
        </Fragment>
    )
}
export default About;