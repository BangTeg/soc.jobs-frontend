import React from "react";
import "../styles/Footer.css";
import { Link } from "@chakra-ui/react";

const Footer = () => {
    return(
        <>
            <footer className="footer"> 
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo"></div>
                        <div className="footer-contact">
                            <ul>
                                <li>
                                    <heading>Our Contact :</heading>
                                </li>
                                <li>hello@socmediaagency.com</li>
                                <li>+6285186883788</li>
                            </ul>
                        </div>
                        <div className="footer-cr">
                            <text>Copyright SocJobs 2023. All rights reserved.</text>
                        </div>
                    </div>
                    <div className="footer-links">
                        <ul>
                            <li>
                                <heading>Useful Links</heading>
                            </li>
                            <li><Link href="/">Homepage</Link></li>
                            <li><Link href="/aboutus">About Us</Link></li>
                            <li><Link href="/contactus">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-address">
                        <ul>
                            <li>
                                <heading>Address</heading>
                            </li>
                            <li>Jl. Mawar Raya No.A42, Baturan, Kec. Colomadu, Kab. Karanganyar, Jawa Tengah 57171<i className="fa"></i></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;