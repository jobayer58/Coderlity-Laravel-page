import discuss from '../../../../images/frontend/image-1.png'
import deal from '../../../../images/frontend/image-2.png'
import develop from '../../../../images/frontend/image-3.png'
import delivery from '../../../../images/frontend/image-4.png'
import '../../../css/Frontend/WorkProcess.css';

const WorkProcess = () => {
    return (
        <section className='work-process-section'>
            <div>
                {/* text */}
                <div className='work-text'>
                    <h1>Our Effective Work Process</h1>
                    <p>We follow a streamlined approach to ensure your project is delivered with the highest quality and efficiency. <br /> From initial consultation and requirement gathering to development, testing, and deployment, our work <br /> process is designed to maintain clear communication, meet deadlines, and exceed expectations.</p>
                </div>
                {/* content */}
                <div className='process-parent'>
                    {/* 1 */}
                    <div className='process-div'>
                        <div className='process-img1'>
                            <img src={discuss} alt="" />
                        </div>
                        <div className='process-text'>
                            <h1>Discuss</h1>
                            <p>We start by engaging in open conversations to understand your goals and expectations.</p>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className='process-div'>
                        <div className='process-img2'>
                            <img src={deal} alt="" />
                        </div>
                        <div className='process-text'>
                            <h1>Deal</h1>
                            <p>After analyzing your needs, we craft transparent proposals that align with your budget.</p>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className='process-div'>
                        <div className='process-img1'>
                            <img src={develop} alt="" />
                        </div>
                        <div className='process-text'>
                            <h1>Develop</h1>
                            <p>Our team uses technical expertise to create solutions tailored to your requirements.</p>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className='process-div'>
                        <div className='process-img2'>
                            <img src={delivery} alt="" />
                        </div>
                        <div className='process-text'>
                            <h1>Delivery</h1>
                            <p>With meticulous attention to detail, we ensure timely delivery while exceeding your expectations.</p>
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>

        </section>
    );
};

export default WorkProcess;