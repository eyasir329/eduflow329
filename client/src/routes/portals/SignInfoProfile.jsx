import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from "../../redux/user/userSlice"


export default function Profile(props) {

    const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);

    const currentUserMail = currentUser.email;

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            dispatch(updateUserStart());

            const res = await fetch(`http://localhost:5000/api/user/update/${currentUser.userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                toast(data.message)
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
            const res = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`, {
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
                        dispatch(deleteUserFailure("An unexpected error occurred (Under Construction)"));
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

    return (
        <>
            <div className='user-heading'>{props.title}</div>
            <div className='guest-content'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <form>
                            <div className='card'>
                                <div className='top'>
                                    <input
                                        type='email'
                                        defaultValue={currentUserMail}
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
            <ToastContainer />
        </>
    )
}
