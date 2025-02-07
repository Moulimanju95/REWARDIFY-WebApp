import Styles from './index.module.css';
import QuickAction from '../DashboardHome/orders/QuickAction/QuickAction';
import OrderLayout from '../OrdersPage/OrderPage'; 
import ConfirmOrders from '../DashboardHome/orders/confirm/confirmorder';
import { useLocation } from 'react-router-dom';
import PrepareOrders from '../../Components/DashboardHome/orders/prepare/prepareOrder';
import PackOrder from '../../Components/DashboardHome/orders/pack/pack';
import CompleteOrder from '../../Components/DashboardHome/orders/complete/complete';
import RecentTransaction from './PaymentDratils/RecentPayment/RecentTransaction';

const DashBoardPage=()=>{
 const location=useLocation();
 const isdashpage=location.pathname==='/home';
 const isorderPrepare=location.pathname==='/home/prepare';
 const ispack=location.pathname==='/home/pack';
 const iscomplete=location.pathname==='/home/complete';
return(
   <div className={Styles.DashBoardPage}>
      <div className={Styles.DashBoardPage_payment_box}>
       <QuickAction/>
       <RecentTransaction/>
      </div>
      <div className={Styles.DashBoardPage_Order}>
        <OrderLayout path='/home'/>
        <div className={Styles.order_show}>
          {isdashpage && <ConfirmOrders/>}
          {isorderPrepare && <PrepareOrders/>}
          {ispack && <PackOrder/>}
          {iscomplete && <CompleteOrder/>}
        </div>
      </div>
    </div>
)
}

export default DashBoardPage;