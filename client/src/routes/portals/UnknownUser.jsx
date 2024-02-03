import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import app from "../../firebase"

export default function UnknownUser() {
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imagePercent,setImagePersent] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image)=>{
    const storage = getStorage(app);
    const fileName = new Date().getDate()+image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snashot)=>{
        const progress = (snashot.bytesTransferred/snashot.totalBytes)*100;
        setImagePersent(Math.round(progress));
      },
      (error)=>{
        setImageError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData,profilePicture:downloadURL})
        });
      }
    );
  };

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
              onChange={(e)=>setImage(e.target.files[0])}
            />
              <img 
              src={formData.profilePicture||currentUser.profilePicture} 
              alt='profile' 
              className='circle-img'
                onClick={()=>fileRef.current.click()}
              />
              <p className='image-below'>
                {imageError?(<span>Error uploading image (filesize must be less than 2 MB)</span>):
                (imagePercent>0 && imagePercent<100?(<span>{`Uploading: ${imagePercent} %`}</span>):imagePercent===100?(<span>Image uploaded successfully</span>):(''))
                }
              </p>
              <div className='guest-extra'>
                <p>Contact Admin To Access Your Account or <br/>  Enter Id and update your account</p>
              </div>
              <div className='guest-extra top'>
              <input
                    type='text'
                    id='id'
                    placeholder=' Enter Your ID'
                    className='name'
                  />
              </div>
              <div className='card'>
                <div className='top'>
                  <input
                    type='text'
                    defaultValue={currentUser.userName}
                    id='username'
                    placeholder='username'
                    className='name'
                  />
                </div>
                <div className='top'>
                  <input
                    type='email'
                    defaultValue={currentUser.email}
                    id='email'
                    placeholder='Email'
                    className=''
                  />
                </div>
                <div className='top'>
                  <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    className=''
                  />

                </div>

              </div>

              <button type='button' className='btn btn-warning guest-button'>update</button>
            </form>
            <div className='guest-below'>
              <span className='info1 info'>Delete Account</span>
              <span className='info2 info'>Sign out</span>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}
