import iconSearch from '../../../../images/frontend/icon-serch.png'
import './Domain.css'
import { GoSearch } from 'react-icons/go';
const Domain = () => {
    
    return (
        <section className="">
            {/* content */}
            <div className="domain-content">
                <div className="domain-content-text">
                    <h1>Find Your Perfect Domain ?</h1>
                    <p>Discover, buy, and register your unique web address using our powerful search or <br className='domain-text-br' /> get creative with our AI Generator.</p>
                </div>
                {/* search */}
                <div className="search-div">
                    <div className="domain-search">
                        {/* <input type="text" className="input-text" placeholder="Type the domain name or a descriptive phrase..." /> */}
                        <p className='input-text'> <GoSearch />Type the domain name or a descriptive phrase...</p>
                        <button className="search-btn">Search Domain</button>
                    </div>
                    <div className="search-left-text">
                        <img src={iconSearch} alt="" />
                        <p>Generate with AI</p>
                    </div>
                </div>
                {/* domain card */}
                <div className="domain-card-parent">
                    {/* 1 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.com</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.online</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.shop</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.pro</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                    {/* 5 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.net</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                    {/* 6 */}
                    <div className="domain-card">
                        <div className="domain-div">
                            <h1 className="domain-extension">.com</h1>
                            <p className="original-price">USD $17.99/yr</p>
                        </div>
                        <div className="domain-pricing">
                            <div className="discount-price">USD $2.99/yr</div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="domain-description">Free WHOIS Privacy Protection is included with every eligible domain registration.</p>
                </div>
            </div>

        </section>
    );
};

export default Domain;