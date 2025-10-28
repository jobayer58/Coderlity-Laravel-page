import { useState } from "react";
import "../../../css/Frontend/DomainBanner.css";
import Domain from "./Domain";
import Hosting from "./Hosting";
import WebApplication from "./WebApplication";
import MobileApplication from "./MobileApplication";
import DigitalMarketing from "./DigitalMarketing";
import TechConsulting from "./TechConsulting";
import UXDesign from "./UXDesign";
import { MdDomain } from "react-icons/md";
import { SiHostinger } from "react-icons/si";
import CRM from "./CRM";

type TabKey =
  | "domain"
  | "hosting"
  | "web-application"
  | "mobile-application"
  | "erp-solution"
  | "digital-marketing"
  | "ui-ux"
  | "tech-consultency";

const DomainBanner = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("domain");

  // Component Map - Clean and Maintainable
  // const componentMap = {
  //     domain: <Domain />,
  //     hosting: <Hosting />,
  //     'web-application': <WebApplication />,
  //     'mobile-application': <MobileApplication />,
  //     'erp-solution': <CRM />,
  //     'digital-marketing': <DigitalMarketing />,
  //     'ui-ux': <UXDesign />,
  //     'tech-consultency': <TechConsulting />
  // };

  const componentMap: Record<TabKey, JSX.Element> = {
    domain: <Domain />,
    hosting: <Hosting />,
    "web-application": <WebApplication />,
    "mobile-application": <MobileApplication />,
    "erp-solution": <CRM />,
    "digital-marketing": <DigitalMarketing />,
    "ui-ux": <UXDesign />,
    "tech-consultency": <TechConsulting />,
  };

  return (
    <section className="domain-section">
      <div className="banner-text-gradient">
        <h1>Our Services</h1>
      </div>
      {/* icon */}
      <div className="domain-banner">
        <div className="icon-parent">
          {/* Domain */}
          <div
            className={`icon-content ${activeTab === "domain" ? "active" : ""}`}
            onClick={() => setActiveTab("domain")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">Domain</p>
          </div>

          {/* Hosting */}
          <div
            className={`icon-content ${
              activeTab === "hosting" ? "active" : ""
            }`}
            onClick={() => setActiveTab("hosting")}
          >
            <div className="icon-div">
              <SiHostinger className="domain-icon" />
            </div>
            <p className="icon-text">Hosting</p>
          </div>

          {/* Web Application */}
          <div
            className={`icon-content ${
              activeTab === "web-application" ? "active" : ""
            }`}
            onClick={() => setActiveTab("web-application")}
          >
            <div className="icon-div">
              <SiHostinger className="domain-icon" />
            </div>
            <p className="icon-text">Web Application</p>
          </div>

          {/* Mobile Application */}
          <div
            className={`icon-content ${
              activeTab === "mobile-application" ? "active" : ""
            }`}
            onClick={() => setActiveTab("mobile-application")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">Mobile Application</p>
          </div>

          {/* ERP Solution */}
          <div
            className={`icon-content ${
              activeTab === "erp-solution" ? "active" : ""
            }`}
            onClick={() => setActiveTab("erp-solution")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">ERP Solution</p>
          </div>

          {/* Digital Marketing */}
          <div
            className={`icon-content ${
              activeTab === "digital-marketing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("digital-marketing")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">Digital Marketing</p>
          </div>

          {/* UI/UX */}
          <div
            className={`icon-content ${activeTab === "ui-ux" ? "active" : ""}`}
            onClick={() => setActiveTab("ui-ux")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">UI/UX</p>
          </div>

          {/* Tech Consultency */}
          <div
            className={`icon-content ${
              activeTab === "tech-consultency" ? "active" : ""
            }`}
            onClick={() => setActiveTab("tech-consultency")}
          >
            <div className="icon-div">
              <MdDomain className="domain-icon" />
            </div>
            <p className="icon-text">Tech Consultency</p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="">{componentMap[activeTab]}</div>
    </section>
  );
};

export default DomainBanner;
