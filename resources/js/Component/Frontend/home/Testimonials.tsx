import React, { useState } from 'react';
import "../../../css/Frontend/Testimonials.css";
import cardRound from '../../../../images/frontend/reviewShapeRound.png'
import reviewDot from '../../../../images/frontend/reviewShape.png'
import reviewDotDown from '../../../../images/frontend/reviwShapedown.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import client1 from '../../../../images/frontend/client.png'
import client2 from '../../../../images/frontend/client2.jpeg'
import client3 from '../../../../images/frontend/client3.jpeg'
import client4 from '../../../../images/frontend/client4.jpeg'
import client5 from '../../../../images/frontend/client5.jpeg'
import client6 from '../../../../images/frontend/client6.jpeg'


const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Sample data - tumi joto card chao ekhane add korte paro
    const testimonials = [
        {
            id: 1,
            img: client1,
            name: "Abdul Aziz",
            position: "CEO - XY Company",
            review: "Working with this company was a game-changer for our business. Their expertise transformed our results!"
        },
        {
            id: 2,
            img: client2,
            name: "Sarah Johnson",
            position: "Marketing Director - ABC Corp",
            review: "Excellent service and outstanding results. Highly recommended for anyone looking for quality work."
        },
        {
            id: 3,
            img: client3,
            name: "Michael Chen",
            position: "CTO - Tech Solutions",
            review: "Professional team with great attention to detail. They delivered beyond our expectations."
        },
        {
            id: 4,
            img: client4,
            name: "Emily Davis",
            position: "Product Manager - Innovate Inc",
            review: "The team was responsive, creative, and delivered on time. Will definitely work with them again."
        },
        {
            id: 5,
            img: client5,
            name: "Robert Wilson",
            position: "Founder - Startup Co",
            review: "Transformed our vision into reality. Their expertise in the field is remarkable."
        },
        {
            id: 6,
            img: client6,
            name: "Lisa Anderson",
            position: "Operations Head - Global Biz",
            review: "Outstanding communication and project management. Made the entire process smooth and easy."
        }
    ];

    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const getVisibleCards = () => {
        const startIndex = currentSlide * cardsPerSlide;
        return testimonials.slice(startIndex, startIndex + cardsPerSlide);
    };

    return (
        <section className='testimonials-section'>
            <h2 className="timeline-title">Client Testimonials</h2>
            <p className="timeline-subtitle">
                Our clients share their success stories and experiences, highlighting our <br /> commitment, quality service, and outstanding project results.
            </p>
            
            {/* Cards */}
            <div className='testimonials-parent'>
                {getVisibleCards().map((testimonial, index) => (
                    <div key={testimonial.id} className='testimonials-card-wrapper'>
                        <img className='card-round' src={cardRound} alt="" />
                        <img className='review-dot' src={reviewDot} alt="" />
                        <img className='review-dot-down' src={reviewDotDown} alt="" />
                        <div className='testimonials-card'>
                            <div className='client-img-div'>
                                <img className='client-img' src={testimonial.img} alt="client-img" />
                            </div>
                            <div className='client-inform'>
                                <div>
                                    <h6>{testimonial.name}</h6>
                                    <p>{testimonial.position}</p>
                                </div>
                                <p className='client-review'>"{testimonial.review}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="arrow-div">
                <div className="arrow-icon-div" onClick={prevSlide}>
                    <IoIosArrowBack className="arrow-icon" />
                </div>
                <div className="arrow-icon-div" onClick={nextSlide}>
                    <IoIosArrowForward className="arrow-icon" />
                </div>
            </div>

            {/* Slide Indicators (Optional) */}
            <div className="slide-indicators">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;