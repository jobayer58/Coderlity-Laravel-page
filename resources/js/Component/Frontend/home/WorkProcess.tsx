import React from 'react';
import "../../../css/Frontend/WorkProcess.css";
import workShape from '../../../../images/frontend/workShape.png'
import workIcon1 from '../../../../images/frontend/workIcon1.png'
import workIcon2 from '../../../../images/frontend/workIcon2.png'
import workIcon3 from '../../../../images/frontend/workIcon3.png'
import workIcon4 from '../../../../images/frontend/workIcon4.png'

const WorkProcess = () => {
    return (
        <section className="work-process-section">
            <div className='all-section-width'>
                <h2 className="timeline-title">Our Effective Work Process</h2>
                <p className="timeline-subtitle">
                    We follow a streamlined approach to ensure your project is delivered with the highest quality and <br /> efficiency. From initial consultation and requirement gathering to development, testing, and <br /> deployment, our work process is designed to maintain clear communication, meet deadlines, and <br /> exceed expectations.
                </p>
                {/* work process */}
                <div className='work-process-parent'>
                    {/* discuss */}
                    <div className='work-process-div'>
                        <div className='work-img-div'>
                            <img className='work-Shape-img' src={workShape} alt="" />
                            <img className='work-icon' src={workIcon1} alt="" />
                        </div>
                        <h5>Discuss</h5>
                        <p>We start by engaging in open conversations to understand your goals and expectations.</p>
                    </div>
                    {/* Deal */}
                    <div className='work-process-div'>
                        <div className='work-img-div'>
                            <img className='work-Shape-img' src={workShape} alt="" />
                            <img className='work-icon' src={workIcon2} alt="" />
                        </div>
                        <h5>Deal</h5>
                        <p>After analyzing your needs, we craft transparent proposals that align with your budget.</p>
                    </div>
                    {/* Develop */}
                    <div className='work-process-div'>
                        <div className='work-img-div'>
                            <img className='work-Shape-img' src={workShape} alt="" />
                            <img className='work-icon' src={workIcon3} alt="" />
                        </div>
                        <h5>Develop</h5>
                        <p>Our team uses technical expertise to create solutions tailored to your requirements.</p>
                    </div>
                    {/* Delivery */}
                    <div className='work-process-div'>
                        <div className='work-img-div'>
                            <img className='work-Shape-img' src={workShape} alt="" />
                            <img className='work-icon' src={workIcon4} alt="" />
                        </div>
                        <h5>Delivery</h5>
                        <p>With meticulous attention to detail, we ensure timely delivery while exceeding your expectations.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkProcess;