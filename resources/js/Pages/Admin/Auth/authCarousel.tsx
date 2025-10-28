import { Fragment } from "react";
import { Col } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logoLight from "../../../../images/coderlity.png";
import { Link } from "@inertiajs/react";

const AuthSlider = () => {
  return (
    <Fragment>
      <Col lg={6}>
        <div className="p-4 p-lg-5 auth-one-bg h-100">
          <div className="bg-overlay"></div>
          <div className="position-relative h-100 d-flex flex-column">
            <div className="mb-4">
              <Link href="/dashboard" className="d-block">
                <img src={logoLight} alt="" height="18" />
              </Link>
            </div>
            <div className="mt-auto">
              <div className="mb-3">
                <i className="ri-double-quotes-l display-4 text-success"></i>
              </div>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                showArrows={false}
                showStatus={false}
                infiniteLoop={true}
                className="slide"
                // id="qoutescarouselIndicators"
              >
                <div className="pb-5 text-center carousel-inner text-white-50">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      " Great! Clean code, clean design, easy for customization.
                      Thanks very much! "
                    </p>
                  </div>
                </div>
                <div className="pb-5 text-center carousel-inner text-white-50">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      " The theme is really great with an amazing customer
                      support."
                    </p>
                  </div>
                </div>
                <div className="pb-5 text-center carousel-inner text-white-50">
                  <div className="item">
                    <p className="fs-15 fst-italic">
                      " Great! Clean code, clean design, easy for customization.
                      Thanks very much! "
                    </p>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default AuthSlider;
