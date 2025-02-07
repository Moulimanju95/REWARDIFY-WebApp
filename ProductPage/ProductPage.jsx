import style from './index.module.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import icons from '../../icons/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const location = useLocation();
  const { data } = location.state || {};  // Default to an empty object to prevent undefined
  const isaddpage = location.pathname === '/home/products/addproduct';
  const navigate = useNavigate();

  // If data is expected to be an array, make sure to provide a default empty array.
  const isDataArray = Array.isArray(data); 

  return (
    <div className={style.ProductLayout}>
      <div className={style.ProductLayout_header}>
        <div className={style.Product_hea}>
          {isaddpage ? 
            (data === undefined || data === null) ? (
              <>
                <div className={style.move_back} onClick={(e) => navigate(-1)}>
                  {icons.leftpointarrow} Back
                </div>
                <h4>Add a product</h4>
              </>
            ) : (
              <>
                <div className={style.move_back} onClick={(e) => navigate(-1)}>
                  {icons.leftpointarrow} Back
                </div>
                <h4>Edit Price</h4>
              </>
            ) :
            <>
              <h4>My Product Listing</h4>
              <button onClick={() => navigate('/home/products/addproduct')}>
                {icons.plussymbol} Add a Product
              </button>
            </>
          }
        </div>
        {!isaddpage && <SearchBar />}
      </div>
      <Outlet />
      
      {/* Example usage of the `data` variable - map safely only if it's an array */}
      {isDataArray && (
        <div>
          {/* If `data` is an array, we can safely map over it */}
          {data.map(item => (
            <div key={item.id}> {/* Assuming the item has an `id` */}
              {item.name} {/* Assuming the item has a `name` */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
