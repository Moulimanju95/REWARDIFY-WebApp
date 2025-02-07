import React, { useState } from "react";
import styles from "./index.module.css"; 
import { uploadimg ,store1} from "../../../../images/images";

const UploadStoreImage = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the uploaded image
  };

  return (
    <div className={styles.Uploadimg_container}>
      <h2 className={styles.docstorecard_header}>Upload Store Image</h2>
      <p className={styles.docscancard_para}>
        Uploading image will help customers to easily recognize your store
      </p>

      {image ? (
        <div className={styles.imagePreview}>
          <img src={image} alt="Uploaded Store" className={styles.previewImage} />
          <div className={styles.imageOptions}>
            <button className={styles.changeButton} onClick={handleUploadClick}>
              Change Image
            </button>
            <span>OR</span>
            <button className={styles.removeButton} onClick={handleRemoveImage}>
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.docscancard} onClick={handleUploadClick}>
          <img
            src={uploadimg}
            alt="uploadimg"
            className={styles.icon}
          />
          <div>
            <h3>Add Profile Image</h3>
            <p>
              Browse your Gallery or take a Picture from the phone Camera to upload
            </p>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadStoreImage;
