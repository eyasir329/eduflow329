import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from "../../redux/user/userSlice"
import Image from './Image';


export default function Profile(props) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);

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

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`http://localhost:5000/api/guest/delete/${currentUser._id}`, {
                method: 'DELETE',
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
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error))
        }
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/signout');
            if (res.ok) {
                dispatch(signOut());
                window.location.href = '/portal/login';
            } else {
                console.log('signout failed');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUploadSuccess = (downloadURL) => {
        setFormData({ ...formData, profilePicture: downloadURL });
    };

    const handleUploadError = (error) => {
        // Handle error, e.g., display an error message
        console.error('Image upload error:', error);
    };

    return (
        <>
            <div className='user-heading'>{props.title}</div>
            <div className='guest-content'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <form>
                            <Image
                                onUploadSuccess={handleUploadSuccess}
                                onUploadError={handleUploadError}
                                defaultValue={currentUser.profilePicture}
                            />
                            {props.title === "Guest User" && <div className='guest-extra'>
                                <p>Enter your valid ID and update your account<br /> Then you automaticaly Access our portal</p>
                            </div>}

                            <div className='guest-extra top'>
                                <input
                                    type='text'
                                    defaultValue={currentUser.userId || ''}
                                    id='userId'
                                    placeholder='Enter Your Unique ID'
                                    className={`name${props.title === "Admin" || props.title === "Guest User" ? ' readOnly' : ''}`}

                                    {...(props.title === "Admin" || props.title === "Guest User" ? { onChange: handleChange } : { readOnly: true })}
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
                            <span className='info' onClick={(event) => handleSignOut(event)}>Sign out</span>
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
