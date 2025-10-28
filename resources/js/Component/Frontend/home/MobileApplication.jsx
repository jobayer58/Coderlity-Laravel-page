import mobileImage from '../../../../images/frontend/mobile.png'
import { Button, Col } from 'react-bootstrap';
import { IoIosCheckmark } from 'react-icons/io';

const MobileApplication = () => {
    return (
        <section className="">
            {/* content */}
            <div className="domain-content">
                {/* web Application Content */}
                <section className="webapp-section">
                    <div>
                        <div className="webapp-parent-row">
                            {/* Left Image */}
                            <Col md={6} className="webapp-image-col">
                                <img src={mobileImage} alt="Web Application" className="webapp-image" />
                            </Col>

                            {/* Right Content */}
                            <div md={6} className="webapp-content">
                                <h2 className="webapp-title">Stunning Mobile Experiences for
                                    Your Users</h2>
                                <p className="webapp-description">
                                    At <span className="highlight">Coderlity</span>, we transform ideas into powerful mobile experiences. We specialize in building robust, scalable, native, and cross-platform applications tailored for both iOS and Android. Our developers use modern, efficient languages to ensure your app is not only fast and visually stunning but also deeply integrated with your existing business systems.We focus on delivering flawless performance, a seamless user experience, and a secure launch, backed by our promise of long-term support.
                                </p>

                                {/* Features */}
                                <div className="webapp-features">
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Native & Cross-Platform Builds
                                        </p>
                                        <p><IoIosCheckmark className="icon" /> Flawless API & System Integration</p>
                                        <p><IoIosCheckmark className="icon" /> Intuitive UI/UX Design</p>
                                    </div>
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> App Store Submission & Guidance</p>
                                        <p><IoIosCheckmark className="icon" /> Performance-First Architecture</p>
                                        <p><IoIosCheckmark className="icon" /> Dedicated, Ongoing Support</p>
                                    </div>
                                </div>
                                
                                {/* Buttons */}
                                <div className="webapp-buttons">
                                    <Button variant="primary" className="start-btn">Start Your Project Now</Button>
                                    <Button variant="link" className="case-btn">View Our Case Studies</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>


        </section>
    );
};

export default MobileApplication;