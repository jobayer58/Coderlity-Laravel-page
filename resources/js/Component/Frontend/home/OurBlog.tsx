
import "../../../css/Frontend/OurBlog.css";
import blog1 from "../../../../images/frontend/blog1.png";
import blog2 from "../../../../images/frontend/blog2.png";
import blog3 from "../../../../images/frontend/blog3.png";
import blog4 from "../../../../images/frontend/blog4.png";
import { GoArrowUpRight } from "react-icons/go";

const OurBlog = () => {
  return (
    <section className="blogs-section">
      {/* Header */}
      <div className="blogs-header">
        <div>
          <h2 className="blogs-title">Our Blog</h2>
          <p className="blogs-subtitle">
            Discover articles and tutorials to help you build better
          </p>
        </div>
        <div>
          <button className="Browse-All">
            Browse All{" "}
            <span>
              <GoArrowUpRight />
            </span>
          </button>
        </div>
        {/* <div className='browse-btn-div'>
                        <button className="browse-btn">Browse all</button>
                        <div className='browse-btn-icon-div'>
                           <FaArrowRightLong className='browse-icon'/>
                        </div>
                    </div> */}
      </div>

      {/* Blog Grid */}
      <div className="blogs-grid">
        {/* Card 1 */}
        <div className="blog-card">
          <img src={blog1} alt="Blog post" />
          <div className="blog-card-content">
            <span className="blog-date">01.10.2025</span>
            <h5 className="blog-card-title">Mastering UI/UX Design</h5>
            <p className="blog-card-description">
              Learn UI/UX principles to create intuitive and engaging designs.
            </p>
            <a href="#" className="read-more-link">
              READ MORE
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="blog-card">
          <img src={blog2} alt="Blog post" />
          <div className="blog-card-content">
            <span className="blog-date">05.10.2025</span>
            <h5 className="blog-card-title">
              Ultimate Guide to Web App Development
            </h5>
            <p className="blog-card-description">
              A complete guide to building and launching scalable web apps.
            </p>
            <a href="#" className="read-more-link">
              READ MORE
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="blog-card">
          <img src={blog3} alt="Blog post" />
          <div className="blog-card-content">
            <span className="blog-date">10.10.2025</span>
            <h5 className="blog-card-title">
              The History of WordPress Development
            </h5>
            <p className="blog-card-description">
              Build custom, high-performance websites easily with WordPress.
            </p>
            <a href="#" className="read-more-link">
              READ MORE
            </a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="blog-card">
          <img src={blog4} alt="Blog post" />
          <div className="blog-card-content">
            <span className="blog-date">15.10.2025</span>
            <h5 className="blog-card-title">
              Digital Marketing for Developers
            </h5>
            <p className="blog-card-description">
              Simple strategies for developers to boost their online presence.
            </p>
            <a href="#" className="read-more-link">
              READ MORE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBlog;
