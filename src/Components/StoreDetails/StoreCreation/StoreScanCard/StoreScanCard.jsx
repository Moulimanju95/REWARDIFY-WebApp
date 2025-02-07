import { Form } from "formik";
import { scanindicateimg, camera } from "../../../../images/images";
import styles from "./index.module.css";
import { useState } from "react";
import Modal from "../../../Modal/Modal";
import QrReader from "react-qr-scanner";

const StoreScanCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [delay] = useState(300);

  const handleScan = (data) => {
    if (data) {
      const qrText = data.text || "";
      console.log("Scanned QR Text:", qrText);

      if (qrText.startsWith("HTTP")) {
        console.log("Redirect URL detected. Please process further:", qrText);
        setUpiId("Redirect URL detected");
        setShowModal(false);
        return;
      }

      if (!qrText.includes("pa=")) {
        console.error("Invalid QR Code");
        setUpiId("Invalid QR Code");
        return;
      }

      const urlParams = new URLSearchParams(qrText.split("?")[1]);
      const extractedUpiId = urlParams.get("pa") || "No UPI ID found";

      console.log("UPI ID:", extractedUpiId);
      setUpiId(extractedUpiId);
      setShowModal(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Reader Error:", err);
    setUpiId("Error reading QR Code");
    setShowModal(false);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <Form className={styles.QRScan_Form}>
      <h3 className={styles.docstorecard_header}>Scan Store QR Code</h3>
      <p className={styles.docscancard_para}>
        Scan the store’s QR Code. It will help the customer make payments
        easy and faster.
      </p>
      <div className={styles.docscancard}>
        <img
          src={scanindicateimg}
          alt="scanimg"
          onClick={() => setShowModal(true)}
        />
        <div>
          <h3>Scan QR Code</h3>
          <p>Take a picture from the camera to upload the QR Code</p>
        </div>
      </div>

      {/* Display Scanned UPI ID */}
      {upiId && (
        <div className={styles.resultContainer}>
          <h4>Store’s UPI:</h4>
          <p className={styles.upiId}>{upiId}</p>
        </div>
      )}

      {/* Modal for QR Code Scanning */}
      <Modal
        show={showModal}
        buttonStyle={styles.scanbutton_style}
        onClose={() => setShowModal(false)}
      >
        <div className={styles.imageContainer}>
          <img
            src={camera}
            alt="Camera Icon"
            style={{ width: "70px", height: "50px" }}
          />
        </div>
        {showModal && (
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        )}
      </Modal>
    </Form>
  );
};

export default StoreScanCard;
