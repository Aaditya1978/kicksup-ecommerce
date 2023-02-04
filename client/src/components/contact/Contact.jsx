import Header from "../header/Header";
import "./Contact.scss";
import twitterIcon from "../../assets/twitter.png";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/insta.png";

export default function Contact() {
    return (
        <>
        <Header />
        <div className="contact">
            <div className="contact-card">
                <div className="heading">Reach Us At</div>
                <div className="contact-info">
                    <div className="contact-item">
                        <div className="item-heading">support@kicksup.com</div>
                        <div className="item-subheading">for any technical support</div>
                    </div>
                    <div className="contact-item">
                        <div className="item-heading">info@kicksup.com</div>
                        <div className="item-subheading">for more information</div>
                    </div>
                    <div className="contact-item">
                        <div className="item-heading">feedback@kicksup.com</div>
                        <div className="item-subheading">to send your feedback</div>
                    </div>
                    <div className="contact-item">
                        <div className="item-heading">jobs@kicksup.com</div>
                        <div className="item-subheading">to work with us</div>
                    </div>
                </div>
            </div>
            <div className="social">
                <div className="heading">Stay in touch</div>
                <div className="social-links">
                    <div className="social-item">
                        <img src={twitterIcon} alt="twitter" />
                    </div>
                    <div className="social-item">
                        <img src={facebookIcon} alt="facebook" />
                    </div>
                    <div className="social-item">
                        <img src={instagramIcon} alt="instagram" />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}