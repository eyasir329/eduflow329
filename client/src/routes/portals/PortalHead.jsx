import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from "../../redux/user/userSlice"
import { Button } from "react-bootstrap";

export default function PortalHead(props) {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.currentUser?.type);
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar_top');

            if (navbar) {
                const navbar_height = navbar.offsetHeight;

                if (window.scrollY > 50) {
                    navbar.classList.add('fixed-top');
                    document.body.style.paddingTop = `${navbar_height}px`;
                } else {
                    navbar.classList.remove('fixed-top');
                    document.body.style.paddingTop = '0';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const userSignout = async (e) => {
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
            <nav id="navbar_top" className="navbar navbar-expand-lg">
                <div className="container">
                    <h1><a className="navbar-brand" href={"/portal/" + role}>{props.text} Portal</a></h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="portal-link text-white fw-bold" href="/">HOME</a></li>
                            <li className="nav-item"><a className="portal-link text-white fw-bold" href={"/portal/" + role + "#" + role + "-profile"}>PROFILE</a></li>
                            <li className="nav-item" ><Button onClick={userSignout}>LOG OUT</Button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
