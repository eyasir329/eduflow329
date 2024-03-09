import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../../firebase';

const Image = ({ defaultValue, onUploadSuccess, onUploadError, maxFileSizeMB = 5 }) => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false); // State to track upload completion
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to show success message

  useEffect(() => {
    if (defaultValue) {
      setImgURL(defaultValue);
    }

    if (image && !uploadComplete) { // Check if upload is not complete before proceeding
      handleFileUpload(image);
    }
  }, [defaultValue, image, uploadComplete]);

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false); // Reset success message after 20 seconds
      }, 2000); // 2 seconds
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        if (onUploadError) {
          onUploadError(error);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          if (onUploadSuccess) {
            onUploadSuccess(downloadURL);
            setUploadComplete(true); // Set upload complete flag
            setShowSuccessMessage(true); // Show success message
          }
        });
      }
    );
  };

  return (
    <>
      <form>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={imgURL}
          alt="profile"
          className="circle-img"
          onClick={() => fileRef.current.click()}
        />
        <p className="image-below">
          {imageError ? (
            <span>Error uploading image (filesize must be less than {maxFileSizeMB} MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span>{`Uploading: ${imagePercent} %`}</span>
          ) : uploadComplete && showSuccessMessage ? (
            <span>Image uploaded successfully</span>
          ) : null // Display success message only once
          }
        </p>
      </form>
    </>
  );
};

export default Image;
