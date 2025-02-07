import style from './index.module.css';
import { useState } from 'react';
import Settlement from '../Settlement/Settlement';
import AllTransaction from '../AllTransaction/AllTransaction';
const RecentTransaction=()=>{
    const [isActive,setisActive]=useState(true);
  
    return(
        <div className={style.RecentTransaction_container}>
            <div className={style.RecentTransaction_container_header}>
                <h4>Recent Transaction</h4>
                <p>Last Update at: June 02, 2024 | 11:25 PM</p>
            </div>
            <div className={style.RecentTransaction_nav}>
                <div onClick={()=>setisActive(!isActive)} className={isActive ? style.active :style.nonactive}>All Transaction</div>
                <div onClick={()=>setisActive(!isActive)} className={ !isActive ? style.active :style.nonactive}>Settlements</div>
            </div>
            {isActive && <AllTransaction/>}
            {!isActive && <Settlement/>}
        </div>
    )
}
export default RecentTransaction