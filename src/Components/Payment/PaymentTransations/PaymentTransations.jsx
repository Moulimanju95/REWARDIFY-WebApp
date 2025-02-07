import style from './index.module.css';
import { useState } from 'react';
import Transaction from '../AllTransactions/Transactions';
import Settlement from '../Settlement/Settlement';

const PaymentTransationsTransations=()=>{
    const [isActive,setisActive]=useState(true);
  
    return(
        <div className={style.PaymentTransations_container}>
            <div className={style.PaymentTransations_container_header}>
                <h4>Recent Transaction</h4>
                <p>Last Update at: June 02, 2024 | 11:25 PM</p>
            </div>
            <div className={style.PaymentTransations_nav}>
                <div onClick={()=>setisActive(!isActive)} className={isActive ? style.active :style.nonactive}>All Transaction</div>
                <div onClick={()=>setisActive(!isActive)} className={ !isActive ? style.active :style.nonactive}>Settlements</div>
            </div>
            {isActive && <Transaction/>}
            {!isActive && <Settlement/>}
        </div>
    )
}
export default PaymentTransationsTransations