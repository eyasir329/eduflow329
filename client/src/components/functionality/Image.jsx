import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import app from '../../firebase';

const Image = ({ onUploadSuccess, onUploadError, maxFileSizeMB = 5, defaultValue }) => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    setImgURL(defaultValue);
    
    if (image) {
      handleFileUpload(image);
    }
  }, [defaultValue, image]);

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
          }
        });
      }
    );
  };

  return (
    <>
      <div className="guest-content">
        <div className="row">
          <div className="col-lg-12">
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
                ) : imagePercent === 100 ? (
                  <span>Image uploaded successfully</span>
                ) : (
                  ''
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Image;
