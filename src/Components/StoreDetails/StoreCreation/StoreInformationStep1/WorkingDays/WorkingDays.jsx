import { Form, Formik, Field } from "formik";
import styles from './index.module.css';
import FormikControl from "../../../../FormikComponent/formikControl";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const WorkdayDays = ({ storeCreateValues }) => {
  const days = useSelector((state) => state?.user?.user);
  const location = useLocation();

  // Ensure that workingdays is properly populated from the redux state
  useEffect(() => {
    if (location.pathname === '/home/profile/shopdetail' && days) {
      storeCreateValues.workingdays = days?.store?.schedule?.map(day => day.value) || [];
    }
  }, [days, location.pathname]);

  const WorkdaysCheckOption = [
    { key: 'Monday', value: '1' },
    { key: 'Tuesday', value: '2' },
    { key: 'Wednesday', value: '3' },
    { key: 'Thursday', value: '4' },
    { key: 'Friday', value: '5' },
    { key: 'Saturday', value: '6' },
    { key: 'Sunday', value: '7' }
  ];

  return (
    <Formik
      initialValues={{ workingdays: storeCreateValues?.workingdays || [] }}
    //  onSubmit={yourSubmitHandler} // Handle form submission
    >
      <Form className={styles.workingdaysinfo_Form}>
        <div className={styles.workingdays_header}>
          <h3 className={styles.docinfocard_header}>Working Days</h3>
          <h4>Select All</h4>
        </div>
        <FormikControl
          className={styles.checkbox_control}
          optiondivname={styles.checkbox_option}
          control="checkbox"
          options={WorkdaysCheckOption}
          name="workingdays"
        />
      </Form>
    </Formik>
  );
};

export default WorkdayDays;
