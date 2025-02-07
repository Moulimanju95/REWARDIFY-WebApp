import "./App.css";
import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";

import LoginStart from "./Components/LoginPages/LoginStart/LoginStart";
import LoginForm from "./Components/LoginPages/LoginForm/LoginForm";
import LoginVerifyOTP from "./Components/LoginPages/LoginVerifyOTP/LoginVerifyOTP";
import LoginResendOTP from "./Components/LoginPages/LoginVerifyOTP/LoginResendOTP";
import NoStore from "./Components/LoginPages/StoreSelect/NoStore";

import ContactForm from "./Components/ContactStoreStart/ContactForm";
import GetContacts from "./Components/ContactStoreStart/ContactSubmit/GetContacts";

import StoreStart from "./Components/ContactStoreStart/StoreStart";
import GetStoreDetails from "./Components/StoreDetails/GetStoreDetails";
import StoreInformation from "./Components/StoreDetails/StoreCreation/StoreInformationStep1/StoreInformation";
import StoreDocuments from "./Components/StoreDetails/StoreCreation/StoreDocStep2/StoreDocuments";
import StoreAgreement from "./Components/StoreDetails/StoreCreation/StoreAgreeStep3/StoreAgreement";

import DashboardLayout from "./Components/DashboardHome/DashboardLayout/DashboardLayout";
import LoginLayout from "./Components/LoginPages/Login/LoginLayout";
import StoreSubmit from "./Components/StoreDetails/StoreCreation/StoreSubmit/StoreSumbit";
import DashboardPage from "./Components/DashboardHome/DashboardPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './utils/apinscalltoken';
import { GET_USER_PROFILE } from './utils/api';
import {useDispatch } from 'react-redux';
import { setUser } from './utils/userSlice';
import { useEffect} from 'react';

import OrderPage from "./Components/OrdersPage/OrderPage";
import ConfirmOrders from './Components/DashboardHome/orders/confirm/confirmorder';
import PrepareOrders from './Components/DashboardHome/orders/prepare/prepareOrder';
import PackOrder from './Components/DashboardHome/orders/pack/pack';
import CompleteOrder from './Components/DashboardHome/orders/complete/complete';

import ProductPage from "./Components/ProductPage/ProductPage";
import ProductListing from "./Components/ProductPage/MyProducts/productlisting/ProductListing";
import AddProduct from "./Components/ProductPage/MyProducts/AddProducts/AddProduct";
import Settlement from "./Components/DashboardHome/PaymentDratils/Settlement/Settlement";

import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ProfileDetail from "./Components/ProfilePage/ProfileDetail/ProfileDetail";
import Wallet from "./Components/ProfilePage/Wallet/Wallet";
import AboutRewardify from "./Components/ProfilePage/About/AboutRewardify";
import LogOut from "./Components/ProfilePage/Logout/LogOut";
import ShopDetail from "./Components/ProfilePage/ShopDetail/ShopDetail";

function App() {
     const dispatch=useDispatch();
  const getprofile=async()=>{
    try {
        const response = await api.get(GET_USER_PROFILE);
        dispatch(setUser(response?.data));

      }catch (error) {
         console.error('Error generating OTP:', error);
      }      
    }

  useEffect(()=>{
    if( localStorage.getItem('authToken')!==''){
        getprofile()
    }
   },[]) 

   const isVerified = () => {
    return localStorage.getItem('authToken') !=='';
  };

  const ProtectedRoute = ({ element }) => {
     return isVerified() ? element : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
       {/*  Login Page */}
          <Route path="/" exact element={<LoginLayout />}>
            <Route index exact element={<LoginStart />} />
            <Route path="login" exact element={<LoginForm />} />
            <Route path="verify" element={<LoginVerifyOTP />} />
            <Route path="resendotp" element={<LoginResendOTP />} />
            <Route path="nostore" element={<NoStore />} />
          </Route>
       {/*  Contact Page */}
          <Route path="storestart" exact element={<StoreStart />}>
            <Route index exact element={<ContactForm />} />
            <Route path="getcontacts" element={<GetContacts />} />
          </Route>

       {/*  Store Page */}
          <Route path="getstoredetails" exact element={<GetStoreDetails />}>
            <Route index exact element={<StoreInformation />} />
            <Route path="storedocs" exact element={<StoreDocuments />} />
            <Route path="storeAgeement" exact element={<StoreAgreement />} />
          </Route>
          <Route path="storesubmit" element={<StoreSubmit />} />

       {/*  Dashboard Page */}
          <Route path='home' exact element={<ProtectedRoute element={<DashboardLayout/>}/>}>
          {/*   <Route path='home' exact element={<DashboardLayout/>}> */}
            <Route path='/home' exact element={<DashboardPage/>}>
                <Route path='prepare'/>
                <Route path='pack' />
                <Route path='complete'/>
                <Route path='settlement' element={<Settlement/>}/>
            </Route>
       {/*  Order Page */}
          <Route path='orders' exact element={<OrderPage/>}>
               <Route index exact element={<ConfirmOrders/>}/>
               <Route path='prepare' element={<PrepareOrders/>}/>
               <Route path='pack' element={<PackOrder/>}/>
               <Route path='complete' element={<CompleteOrder/>}/>
          </Route>
       {/*  MyProduct Page */}
           <Route path='products' exact element={<ProductPage/>}>
              <Route index exact element={<ProductListing/>}/>
              <Route path='addproduct' element={<AddProduct/>}/>
           </Route>
       {/*  Profile Page */}
           <Route path='profile'exact element={<ProfilePage/>}>
              <Route index exact element={<ProfileDetail/>}/>
              <Route path='shopdetail' exact element={<ShopDetail/>}/>
              <Route path='wallet' exact element={<Wallet/>}/>
              <Route path='aboutrewardify' exact element={<AboutRewardify/>}/>
              <Route path='logout' exact element={<LogOut/>}/>
            </Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
