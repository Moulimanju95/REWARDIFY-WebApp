import { Outlet } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import styles from './index.module.css';
import { useState,useCallback,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
/* import { fetchStoreData } from '../../../utils/storeActions'; */

const DashboardLayout=()=>{

/*   const dispatch = useDispatch();
  const store = useSelector((state) => state.store);
 */
/*   useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]); */


  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isMenuBarVisible, setMenuBarVisible] = useState(false);

  const toggleSideBar=useCallback(()=>{
      if(window.innerWidth <=870){
        setMenuBarVisible(!isMenuBarVisible);
        setSidebarVisible(!isSidebarVisible);
      }
  },[isSidebarVisible,isMenuBarVisible]);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 870) {
            setSidebarVisible(true);
            setMenuBarVisible(false);
        }
        if (window.innerWidth < 870) {
          setSidebarVisible(false);
          setMenuBarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [isMenuBarVisible,isSidebarVisible]);

    return(
        <div className={styles.DashboardLayout}>
            <div className={styles.DashboardLayout_Navbar}><NavBar navbarVisible={isMenuBarVisible} togglesideBar={toggleSideBar}/></div>
            <div className={styles.DashboardLayout_Container}>
                {isSidebarVisible && <div className={styles.DashboardLayout_Sidebar} onClick={toggleSideBar}>
                  <SideBar/>
                </div>}
                <div className={styles.DashboardLayout_Main}>
                  <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout;
