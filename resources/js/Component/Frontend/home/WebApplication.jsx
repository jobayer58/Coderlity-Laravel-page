import './WebApplication.css'
import { Button, Col  } from 'react-bootstrap';
import webAppImage from '../../../../images/frontend/kindpng_6210556.png'
import { IoIosCheckmark} from 'react-icons/io';

const WebApplication = () => {
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
                                <img src={webAppImage} alt="Web Application" className="webapp-image" />
                            </Col>

                            {/* Right Content */}
                            <div md={6} className="webapp-content">
                                <h2 className="webapp-title">Custom Web Application <br /> Development</h2>
                                <p className="webapp-description">
                                    At <span className="highlight">Coderlity</span>, we don't just develop software—we engineer growth.
                                    We specialize in architecting robust, scalable web applications using the
                                    modern and secure stack of PHP, MySQL, and the Laravel framework.
                                    Our customized approach translates your unique vision into a seamless digital
                                    solution, focusing on performance, reliability, and an intuitive user experience.
                                </p>

                                {/* Features */}
                                <div className="webapp-features">
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Custom-Engineered Solutions</p>
                                        <p><IoIosCheckmark className="icon" /> Future-Proof Laravel Framework</p>
                                        <p><IoIosCheckmark className="icon" /> Performance-Driven Applications</p>
                                    </div>
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" /> Custom-Engineered Solutions</p>
                                        <p><IoIosCheckmark className="icon" /> Future-Proof Laravel Framework</p>
                                        <p><IoIosCheckmark className="icon" /> Performance-Driven Applications</p>
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

export default WebApplication;