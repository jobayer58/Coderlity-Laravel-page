import UXImage from "../../../../images/frontend/featured5.png";
import hostingImage from "../../../../images/frontend/featured6.png";
import webImage from "../../../../images/frontend/featured7.png";
import marketingImage from "../../../../images/frontend/featured8.png";
import "../../../css/Frontend/Featured.css";

const Featured = () => {
  return (
    <section className="featured-section">
      <div className="featured-text">
        <h1 className="featured-text-title">Featured Items</h1>
        <p>
          We offer a range of high-quality digital products, including PHP
          Laravel frameworks, HTML React JS <br /> front-end templates, and MERN
          projects, designed to meet the needs of modern web development.
        </p>
      </div>
      <div className="featured-card-parent">
        {/* card 1 */}
        <div className="featured-card-div1">
          <div className="featured-img">
            <img src={UXImage} className="img" alt="" />
          </div>
          <div className="featured-content-text">
            <h1>UI/UX Design</h1>
            <p>
              UI/UX Design services craft engaging, user-friendly digital <br />{" "}
              experiences that blend aesthetics with functionality.
            </p>
          </div>
        </div>
        {/* card 2 */}
        <div className="featured-card-div2">
          <div className="featured-img">
            <img src={hostingImage} className="img" alt="" />
          </div>
          <div className="featured-content-text">
            <h1>Domain Hosting</h1>
            <p>
              Our Domain Hosting service provides secure, reliable, and fast{" "}
              <br /> hosting solutions to keep your website always accessible.
            </p>
          </div>
        </div>
        {/* card 3 */}
        <div className="featured-card-div3">
          <div className="featured-img">
            <img src={webImage} className="img" alt="" />
          </div>
          <div className="featured-content-text">
            <h1>Web / App Developing</h1>
            <p>
              Our Game Design service creates immersive, interactive, br and
              engaging gaming experiences tailored to captivate players.
            </p>
          </div>
        </div>
        {/* card 1 */}
        <div className="featured-card-div4">
          <div className="featured-img">
            <img src={marketingImage} className="img" alt="" />
          </div>
          <div className="featured-content-text">
            <h1>Digital Marketing</h1>
            <p>
              Our Digital Marketing service helps grow your brand online through{" "}
              <br /> strategic campaigns, SEO, social media, and targeted
              advertising.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
