// PortalHead.js

import React, { useEffect } from "react";

export default function PortalHead(props) {
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
