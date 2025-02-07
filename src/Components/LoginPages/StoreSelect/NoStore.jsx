import styles from './index.module.css';
import { storeCardLogo} from '../../../images/images';
import { useNavigate } from 'react-router-dom';

const NoStore=()=>{
    const navigate=useNavigate();
    return(
        <div className={styles.login_store}>
            <img src={storeCardLogo} alt='icon'/>
            <h6>No stores are linked to<br></br> this account</h6>
            <p>Enter your account details correctly or register your store with us</p>
              <div className={styles.login_store_content}>
                <button className={styles.login_store_loginbutton} onClick={()=>navigate('/storestart')}>Register your store with us</button>
                <button className={styles.login_store_contactbutton}>Login with different account</button>
              </div>
        </div>
    );
}

export default NoStore;