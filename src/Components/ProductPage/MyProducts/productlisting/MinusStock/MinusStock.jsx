import styles from './index.module.css'
import Modal from '../../../../Modal/Modal';
import api from '../../../../../utils/apinscalltoken';
import { REMOVE_STOCK } from '../../../../../utils/api';
import { useEffect, useState } from 'react';

const MinusStock=({show,onClose,onCancel,product,getproduct})=>{

    const [stock, setStock] = useState(product?.stock);
    const [errorshow,seterrorshow]=useState(false);

    const handleRemoveStock = async () => {
      try {
        const response = await api.post(`${REMOVE_STOCK}${product._id}`, {
          stock: Number(stock),
        });
        getproduct();
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    };
    const handleClose = (e) => {
      handleRemoveStock();
      onClose(e);
    };
    
useEffect(()=>{
  getproduct();
},[show])

useEffect(()=>{
  if (!isNaN(stock) && stock !== null && stock !== '') {
    seterrorshow(true)
  }else{
    seterrorshow(false)
  }
},[stock])

    return(
        <Modal show={show} onClose={handleClose} onCancel={onCancel} buttonStyle={styles.modalbutton_style} button_text='Update Stock'>
            <h4 className={styles.popup_header}>MINUS STOCK</h4>
            <div className={styles.product_update_content}>
                    <h6>Product Name:&nbsp;<span>{product?.productName}</span></h6>
                    <h6>Current Stock:&nbsp;&nbsp;<span>{product?.stock}</span></h6>
            </div>
            <input className={styles.input} placeholder='Reduce stock' value={stock} onChange={(e)=>setStock(e.target.value)}></input>
            {!errorshow && <div className={styles.errorstock}>Enter a Number</div>}

        </Modal>
    )
}

export default MinusStock