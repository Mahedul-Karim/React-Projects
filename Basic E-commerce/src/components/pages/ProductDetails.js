import SingleProduct from "../products/SingleProduct";
import styles from './ProductDetails.module.css';

function ProductDetails(){
    return(
        <section className={styles.details}>
            <SingleProduct />
        </section>
    )
}
export default ProductDetails;