import SearchBar from '../SearchBar/SearchBar'
import style from './index.module.css'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../utils/apinscalltoken'
import { GET_ORDERS_LIST} from '../../utils/api'
import { useDispatch } from 'react-redux'
/* import {setorders} from '../../utils/orderSlice'; */
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const OrderPage=({path='/home/orders'})=>{
    const dispatch=useDispatch()
    const location=useLocation()
    const isorderpage=location.pathname==='/home/orders';
    const ishomepageconfirm=location.pathname==='/home';
    const ishomepageprepare=location.pathname==='/home/prepare'; 
    const ishomepagepack=location.pathname==='/home/pack'; 
    const ishomepagecomplete=location.pathname==='/home/complete';
    // orders not availavble from user now 
    const getorders=async()=>{
        try {
            const response = await api.post(GET_ORDERS_LIST,{
              limit: 20, 
              pageNo: 1 ,
          });
        //   dispatch(setorders(response?.data?.data));
          }catch (error) {
             console.error('Error generating OTP:', error);
          }      
        }
    const confirmorders=useSelector(((state)=>state.userorder.orders))
    const prepareorders=useSelector((state)=>state.userorder.prepareorders)
    const packedorders=useSelector((state)=>state.userorder.pack)
    const completed=useSelector((state)=>state.userorder.complete)

    useEffect(()=>{
        if( localStorage.getItem('authToken')){
            // orders not availavble from user now 
            getorders()
        }
       },[])

    return(
        <div className={ishomepageconfirm || ishomepageprepare || ishomepagepack || ishomepagecomplete ? style.OrderPageinHome :style.OrderPage}>
          <div className={style.OrderPage_header_search}>
                <div className={style.OrderPage_header}>
                  <h4>My Orders</h4>
                   <p>Last Update at: June 02, 2024 | 11:25 PM</p>
                </div>
                { isorderpage && <SearchBar/>}
            </div>
            <div className={style.OrderNavBar}>
                     <NavLink to={path} end className={({ isActive }) => isActive ? style.active : ''}>Confirmation ({confirmorders.length})</NavLink>
                     <NavLink  to={`${path}/prepare`} end className={({ isActive }) => isActive ? style.active : ''}>Preparing ({prepareorders.length})</NavLink>
                     <NavLink  to={`${path}/pack`} end className={({ isActive })=> isActive? style.active : '' }>Packed Orders ({packedorders.length})</NavLink>
                     <NavLink  to={`${path}/complete`}end className={({ isActive })=> isActive? style.active : '' }>Completed ({completed.length})</NavLink>
            </div>
            <div className={style.OrderContents}>
            <Outlet/>
            </div>
        </div>
    )
}

export default OrderPage