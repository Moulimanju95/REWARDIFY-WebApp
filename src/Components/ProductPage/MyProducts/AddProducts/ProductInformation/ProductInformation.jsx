import style from './index.module.css';
import FormikControl from '../../../../FormikComponent/formikControl';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const ProductInformation = ({ proInfo, locationdata }) => {
  const initialValues = {
    ProductDescrip: proInfo?.description || '',
    CountryofOrigin: proInfo?.countryOfOrgin || '',
    Manufacturername: proInfo?.manufacturerName || '',
  };

  const productInfoSchema = Yup.object({
    ProductDescrip: Yup.string().required('Required!'),
    CountryofOrigin: Yup.string().required('Required!'),
    Manufacturername: Yup.string().required('Required!'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productInfoSchema} // Use validationSchema instead of validate
      enableReinitialize
    >
      {(formik) => (
        <div className={style.ProductInformationCard}>
          <h3 className={style.ProductInformation_header}>Product Information</h3>
          <Form className={style.ProductInformationContent}>
            <FormikControl
              className={style.form_control_area}
              legend="Description"
              disabled={!!locationdata}
              control="textarea"
              rows={10}
              placeholder="Description of the Product"
              name="ProductDescrip"
            />
            <div className={style.productMan}>
              <FormikControl
                className={style.form_control}
                legend="Country of Origin"
                disabled={!!locationdata}
                control="input"
                placeholder="Country of Origin"
                name="CountryofOrigin"
              />
              <FormikControl
                className={style.form_control}
                legend="Manufacturer"
                disabled={!!locationdata}
                control="input"
                placeholder="Manufacturer name"
                name="Manufacturername"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ProductInformation;
