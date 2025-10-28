
import digital from '../../../../images/frontend/digital.png'
import { Button, Col } from 'react-bootstrap';
import { IoIosCheckmark } from 'react-icons/io';

const DigitalMarketing = () => {
    return (
        <section>
            {/* content */}
            <div className="domain-content">
                {/* web Application Content */}
                <section className="webapp-section">
                    <div>
                        <div className="webapp-parent-row">
                            {/* Left Image */}
                            <Col md={6} className="webapp-image-col">
                                <img src={digital} alt="Web Application" className="webapp-image" />
                            </Col>

                            {/* Right Content */}
                            <div md={6} className="webapp-content">
                                <h2 className="webapp-title">Data-Driven Digital Marketing Solutions.</h2>
                                <p className="webapp-description">
                                    At <span className="highlight">Coderlity</span>, we don't just run ads; we engineer your online growth. We provide full-spectrum Digital Marketing solutions designed to integrate flawlessly with your brand, driving qualified traffic, increasing conversions, and maximizing ROI. Our strategies are built on real-time data and analytics, ensuring every campaign—from SEO to paid media—is precise, effective, and perfectly aligned with your business goals.
                                </p>

                                {/* Features */}
                                <div className="webapp-features">
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Customized Growth Strategy
                                        </p>
                                        <p><IoIosCheckmark className="icon" /> High-Impact Content & SEO </p>
                                        <p><IoIosCheckmark className="icon" /> Data-Driven Analytics & Reporting</p>
                                    </div>
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" />Full-Funnel Campaign Management</p>
                                        <p><IoIosCheckmark className="icon" /> Conversion-Focused Web Design</p>
                                        <p><IoIosCheckmark className="icon" />Dedicated, Ongoing Partnership</p>
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

export default DigitalMarketing;