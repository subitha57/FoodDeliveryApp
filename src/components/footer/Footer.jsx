import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className="footer-content-left">
                    <h1>{t("Tandoori Pizza")}</h1>
                    <p>{t("Order your Favourite Food")}</p>
                    <div className='footer-social-icon'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>{t("COMPANY")}</h2>
                    <ul>
                        <li>{t("Home")}</li>
                        <li>{t("About Us")}</li>
                        <li>{t("Delivery")}</li>
                        <li>{t("Privacy Policy")}</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>{t("GET IN TOUCH")}</h2>
                    <ul>
                        <li>+91 00000 00000</li>
                        <li>contact@tandooripizza.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 @ Tandoori.com - All Right Reserved</p>
        </div>
    )
}

export default Footer