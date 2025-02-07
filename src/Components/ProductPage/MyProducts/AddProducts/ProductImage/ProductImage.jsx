import style from './index.module.css';
import { dummyimg } from '../../../../../images/images';

const ProductImage=({img=dummyimg,locationdata})=>{
   
    return(
            <div className={style.ProductImageCard}  aria-disabled={!!locationdata}>
                <h3 className={style.ProductImage_header} >Product Image</h3>
                <p>Product images will be fetched from the Rewardify server</p>
                <div className={style.imgContainer}>
                  <img src={img} alt='Dummy img'loading='lazy' style={{width:'150px',height:'140px'}}/>
                </div>
            </div>
    )
}

export default ProductImage;