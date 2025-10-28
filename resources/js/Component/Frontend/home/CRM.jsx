
import { Button, Col } from 'react-bootstrap';
import { IoIosCheckmark } from 'react-icons/io';
import CRMImage from '../../../../images/frontend/CRM.png'

const CRM = () => {
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
                                <img src={CRMImage} alt="Web Application" className="webapp-image" />
                            </Col>

                            {/* Right Content */}
                            <div md={6} className="webapp-content">
                                <h2 className="webapp-title">Custom CRM, POS, & SaaS Solutions.</h2>
                                <p className="webapp-description">
                                    At <span className="highlight">Coderlity</span>, we build the platforms that run modern business. We specialize in developing custom CRM, POS, and comprehensive SaaS platforms designed to integrate seamlessly with your operations, automate workflows, and deliver actionable data. We provide a high-performance, secure, and scalable system tailored exactly to your unique business process, maximizing efficiency and driving growth.
                                </p>

                                {/* Features */}
                                <div className="webapp-features">
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Custom Workflow Automation
                                        </p>
                                        <p><IoIosCheckmark className="icon" /> Cloud-Native & Scalable Architecture</p>
                                        <p><IoIosCheckmark className="icon" /> Real-Time Reporting & Analytics</p>
                                    </div>
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Ironclad Data Security & Compliance</p>
                                        <p><IoIosCheckmark className="icon" /> User-Centric UI/UX Design</p>
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

export default CRM;