import style from './index.module.css';
import FormikControl from '../../../../FormikComponent/formikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const DeliveryDetails = () => {
  const initialValues = {
    DeliveryOption: [],
  };

  const DeliverySchema = Yup.object({
    DeliveryOption: Yup.array().min(1, 'Required!').required('Required!'),
  });

  const DeliveryOption = [
    { key: 'Instant delivery', value: '0' },
    { key: 'Schedule delivery', value: '1' },
    { key: 'Store Pickup', value: '2' },
  ];

  return (
    <Formik initialValues={initialValues} validationSchema={DeliverySchema}>
      {(formik) => {
        return (
          <div className={style.DeliveryDetailsCard}>
            <h3 className={style.DeliveryDetailsInfo_header}>Delivery Details</h3>
            <Form className={style.DeliveryDetailsInfoContent}>
              <div className={style.Deliveryheader}>
                <h3>Delivery Type</h3>
                <p>You can select multiple options</p>
              </div>
              <FormikControl
                className={style.checkbox_control}
                optiondivname={style.checkbox_option}
                control="checkbox"
                options={DeliveryOption}
                name="DeliveryOption"
              />
              {formik.errors.DeliveryOption && formik.touched.DeliveryOption && (
                <div className={style.error}>{formik.errors.DeliveryOption}</div>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default DeliveryDetails;
