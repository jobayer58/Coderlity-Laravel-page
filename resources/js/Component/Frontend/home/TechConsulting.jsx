
import tech from '../../../../images/frontend/tech.png'
import { Button, Col } from 'react-bootstrap';
import { IoIosCheckmark } from 'react-icons/io';


const TechConsulting = () => {
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
                                <img src={tech} alt="Web Application" className="webapp-image" />
                            </Col>

                            {/* Right Content */}
                            <div md={6} className="webapp-content">
                                <h2 className="webapp-title">Tech Consultancy Engineered for Growth.</h2>
                                <p className="webapp-description">
                                    At <span className="highlight">Coderlity</span>, we turn complex technology challenges into clear strategic roadmaps. Our consultancy services provide your business with expert guidance, from selecting the right software architecture (SaaS, cloud, infrastructure) to optimizing team performance and minimizing technical debt. We partner with you to align technology investments directly with your core business objectives, ensuring every decision drives efficiency, scalability, and long-term competitive advantage.
                                </p>

                                {/* Features */}
                                <div className="webapp-features">
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" />Digital Transformation Roadmaps
                                        </p>
                                        <p><IoIosCheckmark className="icon" />System Audit & Optimization</p>
                                        <p><IoIosCheckmark className="icon" />Software Architecture Review</p>
                                    </div>
                                    <div xs={12} sm={6}>
                                        <p><IoIosCheckmark className="icon" />Technical Debt Reduction Plans</p>
                                        <p><IoIosCheckmark className="icon" />Technology Stack Selection</p>
                                        <p><IoIosCheckmark className="icon" />Security and Compliance Reviews</p>
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

export default TechConsulting;