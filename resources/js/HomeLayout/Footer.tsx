import "../css/Frontend/Footer.css";
import logo from "../../images/frontend/footer-logo.png";
import {
  FaFacebook,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import massanger from "../../images/frontend/sms.png";
import { IoMdArrowUp } from "react-icons/io";
import trustReview from "../../images/frontend/trustreview.png";
import trustPilot from "../../images/frontend/trustpilot.png";
import scroll from '../../images/frontend/scrollUp.png'
import scrollIcon from '../../images/frontend/scrollupicon.png'
import { FaTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
  return (
    <footer className="codarility-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Description */}
          <div className="footer-section description-section">
            <div>
              <img src={logo} alt="" />
              <p className="company-description">
                Ignite digital success with our 360-Degree solution. <br /> We provide
                everything from concept to design and <br /> development, domain and
                hosting to marketing. <br /> Trust us as your partner in the journey to
                your success.
              </p>
              <div className="footer-social">
                <div className="footer-div">
                  <a href="https://www.facebook.com/coderlity" target="_blank">
                    <FaFacebook className="footer-icon" />
                  </a>
                </div>
                <div className="footer-div">
                  <a href="https://www.youtube.com/@coderlity" target="_blank">
                    <FaYoutube className="footer-icon" />
                  </a>
                </div>
                <div className="footer-div">
                  <a href="https://github.com/coderlity" target="_blank">
                    <FaGithub className="footer-icon" />
                  </a>
                </div>
                <div className="footer-div">
                  <a href="https://x.com/coderlity" target="_blank">
                    <FaTwitter className="footer-icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="trust-div">
              <div>
                <a
                  href="https://trustreview.net/businesses/coderlity"
                  target="_blank"
                >
                  <img src={trustReview} alt="" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.trustpilot.com/review/coderlity.com"
                  target="_blank"
                >
                  <img src={trustPilot} alt="" />
                </a>
              </div>
            </div>
          </div>

          {/* Service Links */}
          <div className="footer-section">
            <h3 className="section-title">Service</h3>
            <div className="divider-footer"></div>
            <ul className="footer-links">
              <li>
                <a href="#web-development">Web Development</a>
              </li>
              <li>
                <a href="#app-development">App Development</a>
              </li>
              <li>
                <a href="#customisation">Customisation Service</a>
              </li>
              <li>
                <a href="#installation">Installation Service</a>
              </li>
              <li>
                <a href="#sass">Sass Development</a>
              </li>
              <li>
                <a href="#wordpress">WordPress Development</a>
              </li>
              <li>
                <a href="#shopify">Shopify Development</a>
              </li>
              <li>
                <a href="#erp">ERP Solutions</a>
              </li>
              <li>
                <a href="#uiux">UI/UX Designing</a>
              </li>
              <li>
                <a href="#digital-marketing">Digital Marketing Tech</a>
              </li>
              <li>
                <a href="#it-consultation">IT Consultation</a>
              </li>
            </ul>
          </div>

          {/* Products Links */}
          <div className="footer-section">
            <h3 className="section-title">Products</h3>
            <ul className="footer-links">
              <li>
                <a href="#php">PHP Lanwel</a>
              </li>
              <li>
                <a href="#html">HTML / CSS</a>
              </li>
              <li>
                <a href="#react">React JS</a>
              </li>
              <li>
                <a href="#node">Node.js</a>
              </li>
              <li>
                <a href="#mern">MERN Stack Projects</a>
              </li>
              <li>
                <a href="#mobile-templates">Mobile App Templates</a>
              </li>
              <li>
                <a href="#plugins">Plugin & Extensions</a>
              </li>
              <li>
                <a href="#erp-software">ERP Solutions Software</a>
              </li>
              <li>
                <a href="#crm">CRM-POS Software</a>
              </li>
              <li>
                <a href="#seo-tools">SEO Tools & Resources</a>
              </li>
              <li>
                <a href="#custom-templates">Custom Templates</a>
              </li>
            </ul>
          </div>

          {/* Digital Marketing Links */}
          <div className="footer-section">
            <h3 className="section-title">Digital Marketing</h3>
            <ul className="footer-links">
              <li>
                <a href="#seo">SEO</a>
              </li>
              <li>
                <a href="#google-business">Google My Business Service</a>
              </li>
              <li>
                <a href="#social-media">Social Media Advertising</a>
              </li>
              <li>
                <a href="#lead-generation">Lead generation</a>
              </li>
              <li>
                <a href="#backlinking">Backlinking</a>
              </li>
              <li>
                <a href="#guest-posting">Guest Posting</a>
              </li>
              <li>
                <a href="#ppc">PPC Advertising</a>
              </li>
              <li>
                <a href="#content-marketing">Content Marketing</a>
              </li>
              <li>
                <a href="#email-marketing">Email Marketing</a>
              </li>
              <li>
                <a href="#google-ads">Google Ads</a>
              </li>
              <li>
                <a href="#facebook-ads">Facebook ads</a>
              </li>
            </ul>
          </div>

          {/* Web Hosting Links */}
          <div className="footer-section">
            <h3 className="section-title">Web Hosting</h3>
            <ul className="footer-links">
              <li>
                <a href="#shared-hosting">Shared Hosting</a>
              </li>
              <li>
                <a href="#vps">VPS Hosting</a>
              </li>
              <li>
                <a href="#dedicated">Dedicated Hosting</a>
              </li>
              <li>
                <a href="#cloud">Cloud Hosting</a>
              </li>
              <li>
                <a href="#dedicated-server">Dedicated Server</a>
              </li>
              <li>
                <a href="#wordpress-hosting">WordPress Hosting</a>
              </li>
              <li>
                <a href="#reseller">Reseller Hosting</a>
              </li>
              <li>
                <a href="#ecommerce">E-commerce Hosting</a>
              </li>
              <li>
                <a href="#domain">Domain</a>
              </li>
              <li>
                <a href="#ssl">SSL Solutions</a>
              </li>
              <li>
                <a href="#smtp">SMTP</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h3 className="section-title">Company</h3>
            <ul className="footer-links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#login">Account Login</a>
              </li>
              <li>
                <a href="#register">Account Registration</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#refund">Refund Policy</a>
              </li>
              <li>
                <a href="#support">Support Centre</a>
              </li>
              <li>
                <a href="#support-policy">Support Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2022 - 2025 All Right Reserved By Codarility
          </p>
          <div className="footer-coderlity">
            <h1>Coderlity</h1>
          </div>
          {/* messenger */}
          <div className="footer-social-sms-container">
            {/* Arrow up */}
            <div
              className={`scrollUp-div ${isVisible ? '' : 'hidden'}`}
              onClick={scrollToTop}
              style={{ cursor: 'pointer' }}
            >
              <img src={scroll} alt="Scroll background" />
              <div className='scrollIcon-up'>
                <img src={scrollIcon} alt="Scroll to top" />
                <p className='scroll-text-up'>Scroll Up</p>
              </div>
            </div>
            {/* 3 */}
            <div className="footer-social-sms">
              <div className="sms-div">
                <img src={massanger} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
