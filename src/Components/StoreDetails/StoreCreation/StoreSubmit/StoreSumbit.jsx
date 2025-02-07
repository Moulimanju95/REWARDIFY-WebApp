import styles from './index.module.css';
import icons from '../../../../icons/icons';
import { storeCardLogo} from '../../../../images/images';

const StoreSubmit=()=>{
    return(
    <div className={styles.contact_cards}>
     <img src={storeCardLogo} alt='icon'/>
        <div className={styles.contact_card1}>
                <div className={styles.contact_card_header}>Thanks for the details</div>
                <div className={styles.contact_card_para}>We're working to launch your store live in the market very soon. Once we done our verification we will send you the credentials</div>

        </div>
        <div className={styles.contact_card}>
                <div className={styles.contact_card_header}>Contact Us</div>
                <div className={styles.contact_card_para}>For any enquiries contact us</div>
                <div className={styles.contact_card_button}>
                        <div className={styles.button_icon}>{icons.phoneoutline}</div>
                        <button>Contact via Call</button>
                </div>
                <div className={styles.contact_card_button}>
                        <div className={styles.button_icon}>{icons.whatsapp}</div> 
                        <button>Contact Via WhatsApp</button>
                </div>
        </div>
   </div>
    )
}

export default StoreSubmit;