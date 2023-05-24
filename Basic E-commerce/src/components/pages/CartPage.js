import AddCart from '../cart/AddCart';
import styles from './CartPage.module.css';


function CartPage(){
    return(
        <section className={styles['cart-container']}>
            <AddCart />
        </section>
    )
}
export default CartPage;