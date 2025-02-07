import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';

const TimePicker = () => {

  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("18:00");
  const location = useLocation();
  const time = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (location.pathname === '/home/profile/shopdetail' && time) {
      setOpenTime(time?.store?.openingTime || "09:00");
      setCloseTime(time?.store?.closingTime || "18:00");
    }
  }, [time, location.pathname]);

  const handleOpenTimeChange = (e) => {
    setOpenTime(e.target.value);
  };

  const handleCloseTimeChange = (e) => {
    setCloseTime(e.target.value);
  };

  return (
    <div className={styles.TimePicker_container}>
      <div className={styles.Time}>
        <label htmlFor="openTime">Open Time:</label>
        <input
          id="openTime"
          type="time"
          value={openTime}
          onChange={handleOpenTimeChange}
        />
      </div>

      <div className={styles.Time}>
        <label htmlFor="closeTime">Close Time:</label>
        <input
          id="closeTime"
          type="time"
          value={closeTime}
          onChange={handleCloseTimeChange}
          min={openTime}
        />
      </div>
    </div>
  );
};

export default TimePicker;
