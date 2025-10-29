import React from 'react';
import "../../../css/Frontend/Technologies.css";
import icon from '../../../../images/frontend/idea5.png'
import html from '../../../../images/frontend/html5.png'
import css3 from '../../../../images/frontend/css3.png'
import net from '../../../../images/frontend/microsoft.png'
import mysql from '../../../../images/frontend/mysql.png'
import php from '../../../../images/frontend/php.png'
import jquery from '../../../../images/frontend/jquery.png'
import vue from '../../../../images/frontend/vue.png'
import fluter from '../../../../images/frontend/flutter.png'
import wordpress from '../../../../images/frontend/wordpress.png'
import bootstrap from '../../../../images/frontend/bootstrap.png'
import tailwind from '../../../../images/frontend/tailwind.png'
import react from '../../../../images/frontend/react.png'
import nuxt from '../../../../images/frontend/nuxtjs.png'
import next from '../../../../images/frontend/nextjs.png'
import javascript from '../../../../images/frontend/javascript.png'
import foday from '../../../../images/frontend/simple-icons_elementor.png'
import WPBakery from '../../../../images/frontend/WPBakery.png'



const Technologies = () => {
    return (
        <section className='technologies-section'>
            <div className='all-section-width'>
                <h2 className="timeline-title">Technologies we work With</h2>
            <p className="timeline-subtitle">
                At our company, we work with the latest technologies to deliver innovative, secure, and high- <br /> performing solutions. Our expertise includes web, mobile, cloud, AI, and blockchain development for <br /> modern businesses.
            </p>
            <div className='technologies-parent'>
                {/* 1 */}
                <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={html} alt="icon" />
                    </div>
                    <p>HTML 5</p>
                </div>
                {/* 2 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={css3} alt="icon" />
                    </div>
                    <p>CSS 3</p>
                </div>
                {/* 3 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={jquery} alt="icon" />
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
                        <img src={mysql} alt="icon" />
                    </div>
                    <p>My SQL</p>
                </div>
                {/* 6 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={php} alt="icon" />
                    </div>
                    <p>PHP</p>
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
                        <img src={vue} alt="icon" />
                    </div>
                    <p>Vue.js</p>
                </div>
                {/* 9 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={fluter} alt="icon" />
                    </div>
                    <p>Fluter</p>
                </div>
                {/* 10 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={wordpress} alt="icon" />
                    </div>
                    <p>WordPress</p>
                </div>
                {/* 11 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={bootstrap} alt="icon" />
                    </div>
                    <p>Bootstrap</p>
                </div>
                {/* 12 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={tailwind} alt="icon" />
                    </div>
                    <p>Tailwind CSS</p>
                </div>
                {/* 13 */}
                <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={react} alt="icon" />
                    </div>
                    <p>React</p>
                </div>
                {/* 14 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={nuxt} alt="icon" />
                    </div>
                    <p>Nuxt.js</p>
                </div>
                {/* 15 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={next} alt="icon" />
                    </div>
                    <p>Next.js</p>
                </div>
                {/* 16 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={javascript} alt="icon" />
                    </div>
                    <p>JavaScript</p>
                </div>
                {/* 17 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={foday} alt="icon" />
                    </div>
                    <p>Elementor</p>
                </div>
                {/* 18 */}
               <div className='technologies-div'>
                    <div className='technologies-icon-div'>
                        <img src={WPBakery} alt="icon" />
                    </div>
                    <p>WPBakery</p>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Technologies;