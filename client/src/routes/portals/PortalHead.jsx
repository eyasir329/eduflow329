import React, { useEffect } from "react";
// import { Helmet } from 'react-helmet';

export default function PortalHead(props) {
    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.getElementById('navbar_top').classList.add('fixed-top');
                const navbar_height = document.querySelector('.navbar').offsetHeight;
                document.body.style.paddingTop = navbar_height + 'px';
            } else {
                document.getElementById('navbar_top').classList.remove('fixed-top');
                document.body.style.paddingTop = '0';
            }
        });

        return () => {
            window.removeEventListener('scroll', function () {

            });
        };
    }, []);
    return (
        <>
            <nav id="navbar_top" className="navbar navbar-expand-lg">
                <div className="container">
                    <h1><a className="navbar-brand" href="/portal/admin">{props.text}</a></h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="portal-link text-white fw-bold" href="/">HOME</a></li>
                            <li className="nav-item"><a className="portal-link text-white fw-bold" href="/">ABOUT</a></li>
                            <li className="nav-item"><a className="portal-link text-white fw-bold" href="/">LOG OUT</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}