import { useState } from "react";
import "../../../css/Frontend/FAQ.css";
import { GoPlus } from "react-icons/go";
import { VscChromeMinimize } from "react-icons/vsc";
import shape from "../../../../images/frontend/curvedshape.png";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faq = [
    {
      title: "What services does Coderlity provide?",
      description:
        "Reliable and secure hosting solutions to keep your website online and performing at its best all the time.",
    },
    {
      title: "How long does it take to complete a project?",
      description:
        "We build high-performing mobile apps with intuitive UI and cross-platform compatibility to deliver a seamless user experience on all devices.",
    },
    {
      title: "What is your pricing model—fixed cost or hourly?",
      description:
        "We create engaging user experiences through intuitive design, ensuring usability and aesthetics blend perfectly together.",
    },
    {
      title: "How do I get started with Coderlity?",
      description:
        "Reliable and secure hosting solutions to keep your website online and performing at its best all the time.",
    },
  ];

  const toggleService = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="faq-section">
      <div className="faq-parent">
        <div className="faq-text-div">
          <div>
            <h1 className="blogs-title">
              Freequently <br />
              asked Questions
            </h1>
            <p className="blogs-subtitle">
              Have questions about our services, process, or pricing? Our FAQ{" "}
              <br className="br" /> section is here to provide clear answers and
              help you better <br className="br" /> understand how Coderlity can
              support your digital journey.
            </p>
            <button className="lats-talk-btn">Lats Talk</button>
            <img className="shape-img" src={shape} alt="" />
          </div>
        </div>
        <div className="faq-container">
          {faq.map((faq: any, index) => (
            <div
              key={faq.id}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleService(index)}
            >
              <div className="faq-title">
                {faq.title}
                {activeIndex === index ? (
                  <VscChromeMinimize className="plus" />
                ) : (
                  <GoPlus className="plus" />
                )}
              </div>
              {activeIndex === index && (
                <p className="faq-description">{faq.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
