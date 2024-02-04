import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import app from "../../firebase"
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from "../../redux/user/userSlice"


export default function UnknownUser() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePersent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error:errorMessage } = useSelector((state) => state.user);
  console.log(errorMessage);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snashot) => {
        const progress = (snashot.bytesTransferred / snashot.totalBytes) * 100;
        setImagePersent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL })
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
  
      const res = await fetch(`http://localhost:5000/api/guest/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.startsWith("application/json")) {
          // If the response is JSON, try to parse it
          const errorData = await res.json();
          dispatch(updateUserFailure(errorData.message));
        } else {
          // If not JSON, handle the error based on the content
          const errorText = await res.text();
          const errorMessageRegex = /Error: (.+?)<br>/;
          const matches = errorText.match(errorMessageRegex);
          if (matches && matches.length > 1) {
            const errorMessage = matches[1];
            dispatch(updateUserFailure(errorMessage));
          } else {
            dispatch(updateUserFailure("An unexpected error occurred"));
          }
        }
        return;
      }
  
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(updateUserFailure(data.message || "An unexpected error occurred"));
        return;
      }
  
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
    }
  }

  const handleDeleteAccount = async ()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:5000/api/guest/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.startsWith("application/json")) {
          // If the response is JSON, try to parse it
          const errorData = await res.json();
          dispatch(deleteUserFailure(errorData.message));
        } else {
          // If not JSON, handle the error based on the content
          const errorText = await res.text();
          const errorMessageRegex = /Error: (.+?)<br>/;
          const matches = errorText.match(errorMessageRegex);
          if (matches && matches.length > 1) {
            const errorMessage = matches[1];
            dispatch(deleteUserFailure(errorMessage));
          } else {
            dispatch(deleteUserFailure("An unexpected error occurred  hh"));
          }
        }
        return;
      }

      const data = await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleSignOut = async()=>{
    try {
      const res = await fetch('http://localhost:5000/api/auth/signout');
      if(res.ok){
        dispatch(signOut());
      }else{
        console.log('signout failed');
      }
    } catch (error) {
      console.log(error);
    }
  }  

  return (
    <>
      <div className='user-heading'>Guest User</div>
      <div className='guest-content'>
        <div className='row'>
          <div className='col-lg-12'>
            <form>
              <input
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt='profile'
                className='circle-img'
                onClick={() => fileRef.current.click()}
              />
              <p className='image-below'>
                {imageError ? (<span>Error uploading image (filesize must be less than 2 MB)</span>) :
                  (imagePercent > 0 && imagePercent < 100 ? (<span>{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (<span>Image uploaded successfully</span>) : (''))
                }
              </p>
              <div className='guest-extra'>
                <p>Contact Admin To Access Your Account or <br />  Enter Id and update your account</p>
              </div>
              <div className='guest-extra top'>
                <input
                  type='text'
                  defaultValue={currentUser.userId}
                  id='userId'
                  placeholder=' Enter Your ID'
                  className='name'
                  onChange={handleChange}
                />
              </div>
              <div className='card'>
                <div className='top'>
                  <input
                    type='text'
                    defaultValue={currentUser.userName}
                    id='userName'
                    placeholder='userName'
                    className='name'
                    onChange={handleChange}
                  />
                </div>
                <div className='top'>
                  <input
                    type='email'
                    defaultValue={currentUser.email}
                    id='email'
                    placeholder='Email'
                    className=''
                    onChange={handleChange}
                  />
                </div>
                <div className='top'>
                  <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    className=''
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button className='btn btn-warning guest-button' onClick={(event) => {
                event.preventDefault();
                handleSubmit(event);
              }}>
                {loading ? 'Loading...' : 'Update'}
              </button>

            </form>
            <div className='guest-below'>
              <span className='info' onClick={handleDeleteAccount}>Delete Account</span>
              <span className='info' onClick={handleSignOut}>Sign out</span>
            </div>
            <p className='guest-wrong'>
            {typeof errorMessage === 'string' ? errorMessage : ''}
            </p>
            <p className='guest-success'>
              {updateSuccess && "User is updated successfully"}
            </p>
          </div>
        </div>


      </div>
    </>
  )
}
