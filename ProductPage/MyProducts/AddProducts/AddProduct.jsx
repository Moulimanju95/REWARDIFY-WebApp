import { useEffect, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import style from './index.module.css';
import ProductDetails from './ProductDetails/ProductDetails';
import ProductInformation from './ProductInformation/ProductInformation';
import DeliveryDetails from './DeliveryDetails/DeliveryDetails';
import ProductImage from './ProductImage/ProductImage';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_STORE_PRODUCT, GET_MASTER_PRODUCT_LIST, EDIT_PRODUCT_PRICE } from '../../../../utils/api';
import api from '../../../../utils/apinscalltoken';

const AddProduct = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const productDetailsRef = useRef();
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [allproductoption, setallproductoption] = useState([]);
  const [listallproduct, setlistallproduct] = useState([]);
  const [productName, setproductName] = useState(data?.product?._id || '');
  const [searchTerm, setSearchTerm] = useState(''); // Search term for product name
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category for filtering
  const [product, setproduct] = useState();

  const productDetails = {
    category: data?.productCategory?.name,
    ProductName: data?.product?._id,
    ProductMRP: data?.originalPrice,
    Discounttype: data?.discountType,
    DiscountValue: data?.discountValue,
    ProductPrice: data?.price,
    UOM: data?.unitType,
    ProductSize: data?.unit,
    AvailableQuantity: data?.stock,
  };

  const handleproductChange = (fieldNamevalue) => {
    setproductName(fieldNamevalue);
    const produc = listallproduct.filter((pro) => pro?._id === fieldNamevalue);
    setproduct(produc[0]);
  };

  useEffect(() => {
    if (productName && listallproduct.length > 0) {
      handleproductChange(productName);
    }
  }, [listallproduct]);

  const handleSaveChanges = async () => {
    const updatedProductDetails = productDetailsRef.current.values;
    setproductName(updatedProductDetails.ProductName);
    if (!data) {
      try {
        await api.post(ADD_STORE_PRODUCT, {
          discountType: Number(updatedProductDetails.Discounttype),
          discountValue: Number(updatedProductDetails.DiscountValue),
          originalPrice: Number(updatedProductDetails.ProductMRP),
          price: Number(updatedProductDetails.ProductPrice),
          product: updatedProductDetails.ProductName,
          stock: Number(updatedProductDetails.AvailableQuantity),
          unit: Number(updatedProductDetails.ProductSize),
          unitType: Number(updatedProductDetails.UOM),
        });
        navigate(-1);
      } catch (error) {
        console.log('Error in Add Product', error);
      }
    } else {
      try {
        await api.patch(`${EDIT_PRODUCT_PRICE}${data?._id}`, {
          discountType: Number(updatedProductDetails.Discounttype),
          discountValue: Number(updatedProductDetails.DiscountValue),
          originalPrice: Number(updatedProductDetails.ProductMRP),
          price: Number(updatedProductDetails.ProductPrice),
          product: updatedProductDetails.ProductName,
          stock: Number(updatedProductDetails.AvailableQuantity),
          unit: Number(updatedProductDetails.ProductSize),
          unitType: Number(updatedProductDetails.UOM),
        });
        navigate(-1);
      } catch (error) {
        console.log('Error in Edit Product', error);
      }
    }
  };

  const filterProducts = (search, category) => {
    return listallproduct.filter(
      (product) =>
        (!search || product.name.toLowerCase().includes(search.toLowerCase())) &&
        (!category || product.productCategory?.name === category)
    );
  };

  useEffect(() => {
    const getallproducts = async () => {
      try {
        const response = await api.post(GET_MASTER_PRODUCT_LIST);
        setlistallproduct(response?.data?.data);

        const allproduct = response?.data?.data.map((product) => ({
          key: product?.name,
          value: product?._id,
        }));
        allproduct.unshift({ key: 'Product Name', value: '0' });
        setallproductoption(allproduct);

        const uniqueCategories = new Set();
        response?.data?.data.forEach((product) => {
          if (product?.productCategory?.name) {
            uniqueCategories.add(product?.productCategory?.name);
          }
        });

        const CategoryOptions = Array.from(uniqueCategories).map((category) => ({
          key: category,
          value: category,
        }));
        CategoryOptions.unshift({ key: 'All Categories', value: '' });
        setCategoryOptions(CategoryOptions);
      } catch (error) {
        console.log('Error in getting all Product', error);
      }
    };

    getallproducts();
  }, []);

  // Filtered product options based on search term and category
  const filteredOptions = filterProducts(searchTerm, selectedCategory).map((product) => ({
    key: product.name,
    value: product._id,
  }));

  // Yup validation schema
  const validationSchema = Yup.object({
    ProductName: Yup.string().required('Product name is required'),
    ProductMRP: Yup.number()
      .required('Product MRP is required')
      .positive('Product MRP must be a positive number'),
    ProductPrice: Yup.number()
      .required('Product price is required')
      .positive('Product price must be a positive number'),
    AvailableQuantity: Yup.number()
      .required('Available quantity is required')
      .integer('Available quantity must be an integer')
      .positive('Available quantity must be a positive number'),
    ProductSize: Yup.number()
      .required('Product size is required')
      .positive('Product size must be a positive number'),
    DiscountValue: Yup.number()
      .required('Discount value is required')
      .positive('Discount value must be a positive number'),
  });

  return (
    <div className={style.AddProduct}>
      {/* <input
        type="text"
        placeholder="Search product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.searchInput}
      /> */}
     {/*  <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={style.categoryDropdown}
      >
        {categoryOptions.map((category) => (
          <option key={category.value} value={category.value}>
            {category.key}
          </option>
        ))}
      </select> */}
      <Formik
        initialValues={productDetails}
        validationSchema={validationSchema}
        innerRef={productDetailsRef}
        onSubmit={handleSaveChanges}
      >
        <Form>
          <ProductDetails
            locationdata={data}
            editproductDetails={productDetails}
            handleproductChange={handleproductChange}
            productoption={filteredOptions}
            CategoryOptions={categoryOptions}
          />
          <ProductInformation
            proInfo={product?.productInformation}
            locationdata={data}
          />
          <div className={style.Product_purchase}>
            <DeliveryDetails />
            <ProductImage img={product?.images?.[0]} locationdata={data} />
          </div>
          <button type="submit" className={style.save_change_button}>
            Save Changes
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;



/* import style from './index.module.css'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductInformation from './ProductInformation/ProductInformation'
import DeliveryDetails from './DeliveryDetails/DeliveryDetails'
import ProductImage from './ProductImage/ProductImage'
import { useLocation, useNavigate } from 'react-router-dom'
import { ADD_STORE_PRODUCT,GET_MASTER_PRODUCT_LIST,EDIT_PRODUCT_PRICE } from '../../../../utils/api'
import api from '../../../../utils/apinscalltoken';
import { useEffect, useRef, useState} from 'react'

const AddProduct=()=>{

    const location=useLocation()
    const {data}=location.state || {};
    const productDetailsRef = useRef();
    const navigate=useNavigate()
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [allproductoption,setallproductoption] = useState([]);
    const [listallproduct,setlistallproduct]=useState([]);
    const [productName, setproductName] = useState(data?.product?._id || '');

    const [product,setproduct]=useState();
    
    const productDetails={
        category:data?.productCategory?.name,
        ProductName:data?.product?._id,
        ProductMRP:data?.originalPrice,
        Discounttype:data?.discountType,
        DiscountValue:data?.discountValue,
        ProductPrice:data?.price,
        UOM:data?.unitType,
        ProductSize:data?.unit,
        AvailableQuantity:data?.stock,
    }

    const handleproductChange = (fieldNamevalue) => {
        setproductName(fieldNamevalue);
        const produc=listallproduct.filter((pro)=>pro?._id===fieldNamevalue);
        setproduct(produc[0])
      };

    useEffect(() => {
        if (productName && listallproduct.length > 0) {
          handleproductChange(productName);
        }
      }, [listallproduct]);

    const handleSaveChanges=async()=>{
        const updatedProductDetails = productDetailsRef.current.values;
        setproductName(updatedProductDetails.ProductName);
       if(!data){
            try{
            const response=await api.post(ADD_STORE_PRODUCT,{
                "discountType":  Number(updatedProductDetails.Discounttype),
                "discountValue":  Number(updatedProductDetails.DiscountValue),
                "originalPrice": Number(updatedProductDetails.ProductMRP),
                "price":  Number(updatedProductDetails.ProductPrice),
                "product":updatedProductDetails.ProductName,
                "stock":Number(updatedProductDetails.AvailableQuantity),  
                "unit":   Number(updatedProductDetails.ProductSize),
                "unitType":  Number(updatedProductDetails.UOM),
              })
               navigate(-1)
            }catch(error){
                console.log('Erro in Add Product',error)
            }

        }else{
            
          try{
            const response=await api.patch(`${EDIT_PRODUCT_PRICE}${data?._id}`,{
                "discountType":  Number(updatedProductDetails.Discounttype),
                "discountValue":  Number(updatedProductDetails.DiscountValue),
                "originalPrice": Number(updatedProductDetails.ProductMRP),
                "price":  Number(updatedProductDetails.ProductPrice),
                "product":updatedProductDetails.ProductName,
                "stock":Number(updatedProductDetails.AvailableQuantity),  
                "unit":   Number(updatedProductDetails.ProductSize),
                "unitType":  Number(updatedProductDetails.UOM),
              })
              navigate(-1)
            }catch(error){
                console.log('Error in Add Product',error)
            }
            
        }
    }

    useEffect(()=>{
      
        const getallproducts=async()=>{
            try{
                const response=await api.post(GET_MASTER_PRODUCT_LIST);
                setlistallproduct(response?.data?.data)

               const allproduct=response?.data?.data.map((product,name)=>({
                    key: product?.name,
                    value:product?._id,
               }));
               allproduct.unshift({ key:'Product Name', value: '0'});
               setallproductoption(allproduct)

                const uniqueCategories = new Set();
                response?.data?.data.forEach(product => {
                    if (product?.productCategory?.name) {
                      uniqueCategories.add(product?.productCategory?.name);
                    }
                  });
                const CategoryOptions = Array.from(uniqueCategories).map((category, index) => ({
                    key: category,
                    value:category,
                  }));
                  CategoryOptions.unshift({ key: 'Select related Category', value: '0' });
                  setCategoryOptions(CategoryOptions);

            }catch(error){
                console.log('Error in getting all Product',error)
            }
        }

        getallproducts()
    
    },[])

    return(
        <div className={style.AddProduct}>
            <ProductDetails ref={productDetailsRef} locationdata={data} editproductDetails={productDetails} handleproductChange={handleproductChange} productoption={allproductoption} CategoryOptions={categoryOptions}/>
            <ProductInformation proInfo={product?.productInformation}  locationdata={data}/>
            <div className={style.Product_purchase}>
             <DeliveryDetails/>
             <ProductImage img={product?.images?.[0]}  locationdata={data}/>
            </div>
            <button className={style.save_change_button} onClick={handleSaveChanges}>Save Changes</button>
        </div>
    )
}

export default AddProduct */