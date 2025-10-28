
import '../../../css/Frontend/MeetTeam.css';
import { GoArrowUpRight } from 'react-icons/go';
import meetLeft from '../../../../images/frontend/meetleft.png'
import meetRigth from '../../../../images/frontend/meetright.png'

const MeetTeam = () => {
    return (
        <section className='meet-section'>
            <div className='meet-div'>
                <div><img src={meetLeft} className='meet-left' alt="" /></div>
                <div className='meet-text'>
                    <h1>Let’s build to together</h1>
                    <p>We believe that great things happen when ideas and skills unite. At Coderlity, <br /> we collaborate with visionaries to craft digital solutions that inspire growth, <br /> innovation, and real impact.</p>
                    <div>
                        <button className="meet-team">Meet With Teem<span><GoArrowUpRight /></span></button>
                    </div>
                </div>

                {/* <div className='meet-btn-div'>
                    <button className="meet-btn">Meet With Teem</button>
                    <div className='meet-btn-icon-div'>
                        <FaArrowRightLong className='meet-icon' />
                    </div>
                </div> */}
                <div>
                    <img src={meetRigth} className='meet-right' alt="" />
                </div>
            </div>
        </section>
    );
};

export default MeetTeam;