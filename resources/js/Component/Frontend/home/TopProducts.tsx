import "../../../css/Frontend/TopProducts.css";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import image1 from "../../../../images/frontend/image1.png";
import image2 from "../../../../images/frontend/image2.png";
import image3 from "../../../../images/frontend/image3.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TopProducts = () => {
  return (
    <div>
      <section className="top-products">
        <div>
          {/* text section */}
          <div className="text-div">
            <h1 className="product-title-text">Our Top Products</h1>
            <p className="product-description">
              We offer a range of high-quality digital products, including PHP
              Laravel frameworks, HTML React JS{" "}
              <br className="product-description-br" />
              front-end templates, and MERN projects, designed to meet the needs
              of modern web development.
            </p>
          </div>

          {/* cards section */}
          <div className="cards-container">
            {/* Card 1 */}
            <div className="card-wrapper">
              <Card className="product-card">
                <div className="card-image-container">
                  <Card.Img variant="top" src={image1} />
                  <div className="version-badge version-bg-color1">
                    Version <span className="span-badge-text">3.2</span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="card-title">
                    SignalLab - Forex And Crypto Trading Signal
                  </Card.Title>
                  <div className="rating">
                    Ratting: <span className="span-tag">5/5</span>
                    <div className="stars">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <p>
                    Category: <span className="span-tag">Laravel</span>
                  </p>
                  <hr />
                  <p className="price-line">
                    Live Preview: <span className="dollarSize">$49</span>
                  </p>
                </Card.Body>
              </Card>
            </div>

            {/* Card 2 */}
            <div className="card-wrapper">
              <Card className="product-card">
                <div className="card-image-container">
                  <Card.Img variant="top" src={image3} />
                  <div className="version-badge version-bg-color2">
                    Version <span className="span-badge-text">3.1</span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="card-title">
                    HYIPLAB - Complete HYIP Investment System
                  </Card.Title>
                  <div className="rating">
                    Ratting: <span className="span-tag">5/5</span>
                    <div className="stars">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <p>
                    Category: <span className="span-tag">Laravel</span>
                  </p>
                  <hr />
                  <p className="price-line">
                    Live Preview: <span className="dollarSize">$199</span>
                  </p>
                </Card.Body>
              </Card>
            </div>

            {/* Card 3 */}
            <div className="card-wrapper">
              <Card className="product-card">
                <div className="card-image-container">
                  <Card.Img variant="top" src={image2} />
                  <div className="version-badge version-bg-color3">
                    Version <span className="span-badge-text">5.6</span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="card-title">
                    Xcash - Ultimate Wallet <br /> Solution
                  </Card.Title>
                  <div className="rating">
                    Ratting: <span className="span-tag">5/5</span>
                    <div className="stars">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <p>
                    Category: <span className="span-tag">Laravel</span>
                  </p>
                  <hr />
                  <p className="price-line">
                    Live Preview: <span className="dollarSize">$149</span>
                  </p>
                </Card.Body>
              </Card>
            </div>

            {/* Card 4 */}
            <div className="card-wrapper">
              <Card className="product-card">
                <div className="card-image-container">
                  <Card.Img variant="top" src={image2} />
                  <div className="version-badge version-bg-color3">
                    Version <span className="span-badge-text">5.6</span>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="card-title">
                    Xcash - Ultimate Wallet <br /> Solution
                  </Card.Title>
                  <div className="rating">
                    Ratting: <span className="span-tag">5/5</span>
                    <div className="stars">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <p>
                    Category: <span className="span-tag">Laravel</span>
                  </p>
                  <hr />
                  <p className="price-line">
                    Live Preview: <span className="dollarSize">$149</span>
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
          {/* slider arrow  */}
          <div className="arrow-div">
            <div className="arrow-icon-div">
              <IoIosArrowBack className="arrow-icon" />
            </div>
            <div className="arrow-icon-div">
              <IoIosArrowForward className="arrow-icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopProducts;
