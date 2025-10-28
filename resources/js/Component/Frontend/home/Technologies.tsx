import React from 'react';
import "../../../css/Frontend/Technologies.css";
import icon from '../../../../images/frontend/idea5.png'

const Technologies = () => {
    return (
        <section className='technologies-section'>
            <h2 className="timeline-title">Technologies we work With</h2>
            <p className="timeline-subtitle">
                At our company, we work with the latest technologies to deliver innovative, secure, and high- <br /> performing solutions. Our expertise includes web, mobile, cloud, AI, and blockchain development for <br /> modern businesses.
            </p>
            <div className='technologies-parent'>
                {/* 1 */}
                <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>HTML 5</p>
                </div>
                {/* 2 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>CSS 3</p>
                </div>
                {/* 3 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>jQuery</p>
                </div>
                {/* 4 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>.NET</p>
                </div>
                {/* 5 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>PHP</p>
                </div>
                {/* 6 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>My SQL</p>
                </div>
                {/* 7 */}
                <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Laravel</p>
                </div>
                {/* 8 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Vue.js</p>
                </div>
                {/* 9 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Fluter</p>
                </div>
                {/* 10 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>WordPress</p>
                </div>
                {/* 11 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Bootstrap</p>
                </div>
                {/* 12 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Tailwind CSS</p>
                </div>
                {/* 13 */}
                <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>React</p>
                </div>
                {/* 14 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Nuxt.js</p>
                </div>
                {/* 15 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Next.js</p>
                </div>
                {/* 16 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>JavaScript</p>
                </div>
                {/* 17 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>Elementor</p>
                </div>
                {/* 18 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={icon} alt="icon" />
                    </div>
                    <p>WPBakery</p>
                </div>
            </div>
        </section>
    );
};

export default Technologies;