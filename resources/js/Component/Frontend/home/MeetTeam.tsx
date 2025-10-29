import '../../../css/Frontend/MeetTeam.css';
import meetLeft from '../../../../images/frontend/meetleft.png'
import meetRigth from '../../../../images/frontend/meetright.png'
import whatsapp from '../../../../images/frontend/whatsApp.png'
import telegram from '../../../../images/frontend/telegram.png'
import liveChat from '../../../../images/frontend/liveChat.png'

const MeetTeam = () => {
    return (
        <section className='meet-section'>
            <div className='meet-div'>
                <div><img src={meetLeft} className='meet-left' alt="" /></div>
                <div className='meet-text'>
                    <h1>Direct Chat</h1>
                    <p>Instantly connect with our team through Direct Chat for quick  <br />  support, inquiries, or assistance with your projects. We’re here to <br /> help in real-time!</p>
                    {/* <div>
                        <button className="meet-team">Meet With Teem<span><GoArrowUpRight /></span></button>
                    </div> */}
                    <div className='chat-div'>
                        <a href="https://wa.me/+966500244266" target='_blank'><img src={whatsapp} alt="" /></a>
                        <a href="https://t.me/coderlitysa" target='_blank'><img src={telegram} alt="" /></a>
                        <a href="#"><img src={liveChat} alt="" /></a>
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