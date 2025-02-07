import styles from './index.module.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StoreInformationForm from './StoreInfomationForm/StoreInfomationForm';
import StoreTime from './StoreTime/StoreTime';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OwnerInfomation from './OwnerInfomation/OwnerInfomation';
import WorkingDays from './WorkingDays/WorkingDays';
import StoreUploadImg from './../StoreUploadImage/StoreUploadImg';

const StoreInformation = () => {
  const navigate = useNavigate();

  const storeCreateValues = {
    storeName: '',
    storeaddress: '',
    storenum: '',
    workingdays: [],
    openingTime: '',
    closingTime: '',
    storeOwnerPan: '',
    GSTIN: '',
    GSTINStatus: [],
    bankname: '',
    bankAccountNumber: '',
    bankIFSCCode: '',
    selectoption: '',
    radiooption: '',
    birthdate: null,
    ownerName: '',
    ownerEmail: '',
    ownerphonenu: '',
    whatsappnumber: [],
  };

  const storeCreatevalidationSchema=Yup.object({
    storeName:Yup.string().required('Required !'),
    storeaddress:Yup.string().required('Required !'),
    storenum:Yup.string().required('Required !'),
    workingdays:Yup.array().required('Required !'),
    openingTime: Yup.string()
        .required('Opening time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'), 
    closingTime: Yup.string()
        .required('Closing time is required')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    storeOwnerPan:Yup.string().required('Required !'),
    GSTIN:Yup.string().required('Required !'),
    GSTINStatus:Yup.array().required('Required !'),
    bankname:Yup.string().required('Required !'),
    bankAccountNumber:Yup.string().required('Required !'),
    bankIFSCCode:Yup.string().required('Required !'),
    selectoption:Yup.string().required('Required !'),
    radiooption:Yup.string().required('Required !'),
    birthdate:Yup.date().required('Required !').nullable(),
    ownerName:Yup.string().required('Required !'),
    ownerEmail:Yup.string().required('Required !'),
    ownerphonenu:Yup.string().required('Required !'),
    whatsappnumber:Yup.array().required('Required !'),
});

  const [formValues, setFormValues] = useState(storeCreateValues);

  const handleFormChange = (values) => {
    setFormValues(values);
  };

  useEffect(() => {
    handleFormChange(formValues);
  }, [formValues]);

  return (
    <>
      <div className={styles.docinfoform_header}>Store Information</div>
      <Formik
        initialValues={formValues}
        validate={storeCreatevalidationSchema}
        enableReinitialize
      >
        <div className={styles.docinfoform_Container}>
          <OwnerInfomation />
          <StoreInformationForm />
          <WorkingDays storeCreateValues={formValues} />
          <StoreTime />
          <StoreUploadImg />
          <button
            className={styles.continue_button}
            onClick={() => navigate('/getstoredetails/storedocs')}
          >
            Continue
          </button>
        </div>
      </Formik>
    </>
  );
};

export default StoreInformation;
