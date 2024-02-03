import React from 'react'

import { useSelector } from 'react-redux'

export default function UnknownUser() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <>
      <div className='user-heading'>Guest User</div>
      <div className='guest-content'>
        <div className='row'>
          <div className='col-lg-12'>
            <form>
              <img src={currentUser.profilePicture} alt='profile' className='circle-img'></img>
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
