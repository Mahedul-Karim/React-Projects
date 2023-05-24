import styles from "./NewsLetter.module.css";

function NewsLetter() {
  return (
    <div className={styles['newsletter-container']}>
      <div className={styles['newsletter-texts']}>
        <h3>Join our newsletter and get 20% off</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?</p>
      </div>
      <div >
        <form className={styles['newsletter-form']}>
            <input type="text" placeholder="Enter e-mail"/>
            <button type="submit">subscribe</button>
        </form>
      </div>
    </div>
  );
}
export default NewsLetter;
