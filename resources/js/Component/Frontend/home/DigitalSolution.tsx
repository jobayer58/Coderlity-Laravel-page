import { useState } from "react";
import "../../../css/Frontend/DigitalSolution.css";
import digital from "../../../../images/frontend/solution.png";

const DigitalSolution = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const services = [
    {
      id: 1,
      count: "01",
      title: "Web Development",
      description:
        "Our web application services focus on developing scalable, secure, and user-friendly platforms tailored to your business needs. From custom-built solutions to seamless integration.",
    },
    {
      id: 2,
      count: "02",
      title: "Mobile Application",
      description:
        "We build high-performing mobile apps with intuitive UI and cross-platform compatibility to deliver a seamless user experience on all devices.",
    },
    {
      id: 3,
      count: "03",
      title: "UI/UX Design",
      description:
        "We create engaging user experiences through intuitive design, ensuring usability and aesthetics blend perfectly together.",
    },
    {
      id: 4,
      count: "04",
      title: "Domain Hosting",
      description:
        "Reliable and secure hosting solutions to keep your website online and performing at its best all the time.",
    },
    {
      id: 5,
      count: "05",
      title: "Digital Marketing",
      description:
        "Boost your brand’s visibility with data-driven marketing strategies, SEO optimization, and targeted campaigns.",
    },
    {
      id: 6,
      count: "06",
      title: "Tech Consultancy",
      description:
        "We provide expert technology consulting to help you choose, implement, and optimize the best digital solutions for your business.",
    },
  ];

  const toggleService = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="solution-section">
      <div className="solution-parent">
        <div className="solution-img-div">
          <div>
            <img src={digital} alt="" />
          </div>
          <div>
            <h1>
              Our Complete Digital <br className="" /> Solutions
            </h1>
            <p>
              We provide a complete suite of services that covers web
              development, app development, UI <br className="solution-br" />
              /UX design, API integration (including e-invoicing ZATCA
              integration), digital marketing, IT <br className="solution-br" />{" "}
              consultation, and domain hosting, ensuring all your digital needs
              are met under one roof.
            </p>
          </div>
        </div>
        <div className="solution-service-container">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`solution-service-item ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleService(index)}
            >
              <div className="solution-service-title">
                <div className="solution-count">{service.count}</div>
                <div>{service.title}</div>
              </div>
              {activeIndex === index && (
                <p className="solution-service-description">
                  {service.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalSolution;
