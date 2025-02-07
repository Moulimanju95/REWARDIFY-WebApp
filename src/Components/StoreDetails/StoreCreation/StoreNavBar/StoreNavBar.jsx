import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.css';

const StoreNavBar=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const storeinfocircle=location.pathname === '/getstoredetails' ? styles.circle_green:styles.circle;
    const storedoccircle=location.pathname === '/getstoredetails/storedocs'? styles.circle_green:styles.circle;
    const storeagreecircle=location.pathname === '/getstoredetails/storeAgeement'? styles.circle_green:styles.circle;

    return(
        <div className={styles.store_create_form_navigator}>
            <div >
                    <div className={storeinfocircle}/>
                    <hr className={styles.dotted_line}/>
            </div>
            <div onClick={(e)=>navigate('/getstoredetails')}>
                    <h6>Step 1</h6>
                    <h4>Store Information</h4>
                    <p>Owner name , Store location, Store address</p>
                    <hr className={styles.solid_line} />
            </div>
            <div>
                    <div className={storedoccircle}/>
                    <hr className={styles.dotted_line}/>
            </div>
            <div onClick={(e)=>navigate('/getstoredetails/storedocs')}>
                    <h6>Step 2</h6>
                    <h4>Store Document</h4>
                    <p>GSTIN Number , PAN Number, Bank details</p>
                    <hr className={styles.solid_line} />
            </div> 
            <div>
                    <div className={storeagreecircle}/>
                    <hr className={styles.dotted_line}/>
            </div>
            <div onClick={(e)=>navigate('/getstoredetails/storeAgeement')}>
                    <h6>Step 3</h6>
                    <h4>Agreement</h4>
                    <p>REWARDIFY partner Agreement</p>
                    <hr className={styles.solid_line}/>
            </div>  
        </div>
    )
}
export default StoreNavBar;