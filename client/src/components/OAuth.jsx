import React from 'react'
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import app from '../firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';


export default function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            dispatch(signInStart(result));
            // Access user data from the `result.user` object
            const userData = {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            };
            // Send user data to your server
            const res = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // Include this line to enable sending cookies
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));

        } catch (error) {
            dispatch(signInFailure(error));
            console.log("could not login with google", error);
        }
    }

    const handleFacebookClick = async () => {

    }
    return (
        <>
            <button type='button' className="text-white login-outh" onClick={handleGoogleClick}>
                <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button type='button' className="text-white login-outh" onClick={handleFacebookClick}>
                <FontAwesomeIcon icon={faFacebook} />
            </button>
        </>
    )
}
