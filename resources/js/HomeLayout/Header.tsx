import React, { useEffect, useRef, useState } from "react";
import "../css/Frontend/Header.css";
import logo from "../../images/frontend/web-logo.svg";
import banner1 from "../../images/frontend/banner1.png";
import banner2 from "../../images/frontend/banner2.png";
import moon from "../../images/frontend/navbarlight.png";
import { IoApps, IoCall } from "react-icons/io5";
import { Link, usePage } from "@inertiajs/react";
import {
  Button,
  Card,
  Col,
  InputGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { PiSignIn } from "react-icons/pi";
import { FaGoogleDrive } from "react-icons/fa";
import {
  MdDesignServices,
  MdKeyboardArrowDown,
  MdPhoneIphone,
  MdShoppingCart,
  MdSupport,
  MdWeb,
} from "react-icons/md";

// import dev from "../../images/frontend/dev.png";
import dev from "../../images/frontend/dev.png";
import icon1 from "../../images/frontend/icon1.png";
import icon2 from "../../images/frontend/icon2.png";
import icon3 from "../../images/frontend/icon3.png";
import icon4 from "../../images/frontend/icon4.png";
import icon5 from "../../images/frontend/icon5.png";
import icon6 from "../../images/frontend/icon6.png";
import icon7 from "../../images/frontend/icon7.png";
import icon8 from "../../images/frontend/icon8.png";
import icon9 from "../../images/frontend/icon9.png";
import scroll from "../../images/frontend/scrollDown.png"
import scrollIcon from "../../images/frontend/scrolldownicon.png"

// Define types for your dropdown system
type DropdownName =
  | "services"
  | "products"
  | "digitalMarketing"
  | "webHosting"
  | "company";

// Define the hovered items state type
type HoveredItems = {
  services: any | null;
  products: any | null;
  digitalMarketing: any | null;
  webHosting: any | null;
  company: any | null;
};

const Header = () => {
  const { props } = usePage();
  const { admin, user } = (props as any).auth || {};

  // ioApps Dropdown card
  const [showApps, setShowApps] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleAppsMenu = () => {
    setShowApps((prev) => !prev);
  };

  // 👉 bahire click korle dropdown close ioApps
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setShowApps(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const appItems = [
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
    { icon: <FaGoogleDrive className="app-item-icon" />, name: "Drive" },
  ];

  // navigation bar dropdown card function
  // const [activeDropdown, setActiveDropdown] = useState(null);
  // const [dropdownPosition, setDropdownPosition] = useState('left');
  // const [hoveredItems, setHoveredItems] = useState({
  //     services: null,
  //     products: null,
  //     digitalMarketing: null,
  //     webHosting: null,
  //     company: null
  // });

  // const dropdownRefs = {
  //     services: useRef(null),
  //     products: useRef(null),
  //     digitalMarketing: useRef(null),
  //     webHosting: useRef(null),
  //     company: useRef(null)
  // };

  // const navItemRefs = {
  //     services: useRef(null),
  //     products: useRef(null),
  //     digitalMarketing: useRef(null),
  //     webHosting: useRef(null),
  //     company: useRef(null)
  // };

  // const timeoutRef = useRef(null);

  const [activeDropdown, setActiveDropdown] = useState<DropdownName | null>(
    null
  );
  const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">(
    "left"
  );
  const [hoveredItems, setHoveredItems] = useState<HoveredItems>({
    services: null,
    products: null,
    digitalMarketing: null,
    webHosting: null,
    company: null,
  });

  // Properly type the refs
  const dropdownRefs: Record<DropdownName, React.RefObject<HTMLDivElement>> = {
    services: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    digitalMarketing: useRef<HTMLDivElement>(null),
    webHosting: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
  };

  // const navItemRefs: Record<DropdownName, React.RefObject<HTMLElement>> = {
  //   services: useRef<HTMLElement>(null),
  //   products: useRef<HTMLElement>(null),
  //   digitalMarketing: useRef<HTMLElement>(null),
  //   webHosting: useRef<HTMLElement>(null),
  //   company: useRef<HTMLElement>(null),
  // };

  // Change RefObject<HTMLElement> to RefObject<HTMLDivElement>
  const navItemRefs: Record<DropdownName, React.RefObject<HTMLDivElement>> = {
    services: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    digitalMarketing: useRef<HTMLDivElement>(null),
    webHosting: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
  };

  //   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const servicesData = [
    {
      id: 1,
      name: "Web Development",
      icon: <MdWeb />,
      description: "Modern, fast, and responsive web solutions",
      subServices: [
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "CMS Development",
        "Responsive Development",
        "Custom Development",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "CMS Development",
        "Responsive Development",
        "Custom Development",
      ],
    },
    {
      id: 2,
      name: "Mobile Application",
      icon: <MdPhoneIphone />,
      description: "ERP Solutions",
      subServices: [
        "iOS App Development",
        "Android App Development",
        "Cross-Platform Apps",
        "UI/UX Design",
        "App Maintenance",
        "App Store Optimization",
        "iOS App Development",
        "Android App Development",
        "Cross-Platform Apps",
        "UI/UX Design",
        "App Maintenance",
        "App Store Optimization",
      ],
    },
    {
      id: 3,
      name: "UI/UX",
      icon: <MdDesignServices />,
      description: "Digital marketing",
      subServices: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems",
      ],
    },
    {
      id: 4,
      name: "Tech Consultation",
      icon: <MdSupport />,
      description: "Expert technology guidance",
      subServices: [
        "IT Strategy",
        "System Architecture",
        "Technology Stack",
        "Digital Transformation",
        "Cloud Solutions",
        "Security Audit",
        "IT Strategy",
        "System Architecture",
        "Technology Stack",
        "Digital Transformation",
        "Cloud Solutions",
        "Security Audit",
      ],
    },
    {
      id: 5,
      name: "Digital Marketing",
      icon: <MdShoppingCart />,
      description: "Custom, secure, and high-converting online stores",
      subServices: [
        "Online Store Setup",
        "Payment Integration",
        "Inventory Management",
        "SEO Optimization",
        "Performance Tuning",
        "Security Implementation",
        "Online Store Setup",
        "Payment Integration",
        "Inventory Management",
        "SEO Optimization",
        "Performance Tuning",
        "Security Implementation",
      ],
    },
    {
      id: 6,
      name: "ERP Solution",
      icon: <MdShoppingCart />,
      description: "Custom, secure, and high-converting online stores",
      subServices: [
        "IT Strategy",
        "System Architecture",
        "Technology Stack",
        "Digital Transformation",
        "Cloud Solutions",
        "Security Audit",
        "IT Strategy",
        "System Architecture",
        "Technology Stack",
        "Digital Transformation",
        "Cloud Solutions",
        "Security Audit",
      ],
    },
  ];

  // Products data
  const productsData = [
    {
      id: 1,
      name: "Software Products",
      icon: <MdWeb />,
      description: "Ready-to-use software solutions",
      subServices: ["CRM Software", "ERP Systems", "Inventory Management"],
    },
    {
      id: 2,
      name: "Digital Products",
      icon: <MdShoppingCart />,
      description: "Online digital solutions",
      subServices: ["E-books", "Online Courses", "Digital Templates"],
    },
  ];

  // Digital Marketing data
  const digitalMarketingData = [
    {
      id: 1,
      name: "SEO Services",
      icon: <MdSupport />,
      description: "Search engine optimization",
      subServices: ["On-Page SEO", "Off-Page SEO", "Technical SEO"],
    },
    {
      id: 2,
      name: "Social Media ",
      icon: <MdDesignServices />,
      description: "Social media management",
      subServices: [
        "Content Creation",
        "Community Management",
        "Paid Advertising",
      ],
    },
  ];
  // Digital Marketing data
  const webHostingData = [
    {
      id: 1,
      name: "SEO Services",
      icon: <MdSupport />,
      description: "Search engine optimization",
      subServices: ["On-Page SEO", "Off-Page SEO", "Technical SEO"],
    },
    {
      id: 2,
      name: "Social Media ",
      icon: <MdDesignServices />,
      description: "Social media management",
      subServices: [
        "Content Creation",
        "Community Management",
        "Paid Advertising",
      ],
    },
  ];

  // Company data
  const companyData = [
    {
      id: 1,
      name: "About Us",
      icon: <MdSupport />,
      description: "Learn about our company",
      subServices: ["Our Story", "Mission & Vision", "Team Members"],
    },
    {
      id: 2,
      name: "Careers",
      icon: <MdDesignServices />,
      description: "Join our team",
      subServices: ["Open Positions", "Culture", "Benefits"],
    },
  ];

  // const handleMouseEnter = (dropdownName: any) => {
  //     if (timeoutRef.current) {
  //         clearTimeout(timeoutRef.current);
  //     }
  //     setActiveDropdown(dropdownName);

  //     // Check screen position and adjust dropdown
  //     checkDropdownPosition(dropdownName);

  //     // Set default hovered item for this dropdown
  //     const data = getDataForDropdown(dropdownName);
  //     if (data && data.length > 0 && !hoveredItems[dropdownName]) {
  //         setHoveredItems(prev => ({
  //             ...prev,
  //             [dropdownName]: data[0]
  //         }));
  //     }
  // };

  // Update the function signatures to use the proper types
  const handleMouseEnter = (dropdownName: DropdownName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdownName);

    // Check screen position and adjust dropdown
    checkDropdownPosition(dropdownName);

    // Set default hovered item for this dropdown
    const data = getDataForDropdown(dropdownName);
    if (data && data.length > 0 && !hoveredItems[dropdownName]) {
      setHoveredItems((prev) => ({
        ...prev,
        [dropdownName]: data[0],
      }));
    }
  };

  // const checkDropdownPosition = (dropdownName: any) => {
  //     const navItem = navItemRefs[dropdownName]?.current;
  //     if (!navItem) return;

  //     const rect = navItem.getBoundingClientRect();
  //     const dropdownWidth = 800; // Same as CSS width
  //     const screenWidth = window.innerWidth;

  //     // Check if dropdown will go outside right edge
  //     if (rect.left + dropdownWidth > screenWidth - 20) {
  //         setDropdownPosition('right');
  //     } else {
  //         setDropdownPosition('left');
  //     }
  // };

  const checkDropdownPosition = (dropdownName: DropdownName) => {
    const navItem = navItemRefs[dropdownName]?.current;
    if (!navItem) return;

    const rect = navItem.getBoundingClientRect();
    const dropdownWidth = 800; // Same as CSS width
    const screenWidth = window.innerWidth;

    // Check if dropdown will go outside right edge
    if (rect.left + dropdownWidth > screenWidth - 20) {
      setDropdownPosition("right");
    } else {
      setDropdownPosition("left");
    }
  };

  //   const handleMouseLeave = (dropdownName : any) => {
  //       timeoutRef.current = setTimeout(() => {
  //           const isOverDropdown = dropdownRefs[dropdownName]?.current?.matches(':hover');
  //           const isOverNavItem = navItemRefs[dropdownName]?.current?.matches(':hover');

  //           if (!isOverDropdown && !isOverNavItem) {
  //               setActiveDropdown(null);
  //           }
  //       }, 200);
  //   };

  const handleMouseLeave = (dropdownName: DropdownName) => {
    timeoutRef.current = setTimeout(() => {
      const isOverDropdown =
        dropdownRefs[dropdownName]?.current?.matches(":hover");
      const isOverNavItem =
        navItemRefs[dropdownName]?.current?.matches(":hover");

      if (!isOverDropdown && !isOverNavItem) {
        setActiveDropdown(null);
      }
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  //   const handleDropdownMouseLeave = (dropdownName) => {
  //     timeoutRef.current = setTimeout(() => {
  //       const isOverNavItem =
  //         navItemRefs[dropdownName]?.current?.matches(":hover");

  //       if (!isOverNavItem) {
  //         setActiveDropdown(null);
  //       }
  //     }, 200);
  //   };

  const handleDropdownMouseLeave = (dropdownName: DropdownName) => {
    timeoutRef.current = setTimeout(() => {
      // Access the navItemRefs object using a valid key
      const isOverNavItem =
        navItemRefs[dropdownName]?.current?.matches(":hover");

      if (!isOverNavItem) {
        setActiveDropdown(null);
      }
    }, 200);
  };

  const handleServiceHover = (dropdownName: DropdownName, item: any) => {
    setHoveredItems((prev) => ({
      ...prev,
      [dropdownName]: item,
    }));
  };

  const getDataForDropdown = (dropdownName: DropdownName) => {
    switch (dropdownName) {
      case "services":
        return servicesData;
      case "products":
        return productsData;
      case "digitalMarketing":
        return digitalMarketingData;
      case "webHosting":
        return webHostingData;
      case "company":
        return companyData;
      default:
        return [];
    }
  };

  const handleLinkClick = (e: any) => {
    e.preventDefault();
  };

  const renderDropdownCard = (dropdownName: DropdownName) => {
    const data = getDataForDropdown(dropdownName);
    const hoveredItem = hoveredItems[dropdownName] || data[0];

    return (
      <div
        ref={dropdownRefs[dropdownName]}
        className={`services-dropdown-card ${dropdownPosition === "right" ? "dropdown-right" : ""
          }`}
        onMouseEnter={() => handleDropdownMouseEnter()}
        onMouseLeave={() => handleDropdownMouseLeave(dropdownName)}
      >
        <Card className="shadow-lg">
          <Card.Body className="p-4">
            <Row>
              <Col md={4}>
                <div className="main-services-list">
                  {data.map((item) => (
                    <div
                      key={item.id}
                      className={`service-item ${hoveredItem?.id === item.id ? "active" : ""
                        }`}
                      onMouseEnter={() =>
                        handleServiceHover(dropdownName, item)
                      }
                    >
                      <div className="service-header">
                        <span className="service-icon">{item.icon}</span>
                        <span className="service-name">{item.name}</span>
                      </div>
                      {hoveredItem?.id === item.id && (
                        <div className="service-description">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    <div className="sub-services-column">
                      {hoveredItem?.subServices
                        .slice(
                          0,
                          Math.ceil(hoveredItem?.subServices.length / 2)
                        )
                        .map((subService: any, index: number) => (
                          <div key={index} className="sub-service-item">
                            {subService}
                          </div>
                        ))}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="sub-services-column">
                      {hoveredItem?.subServices
                        .slice(Math.ceil(hoveredItem?.subServices.length / 2))
                        .map((subService: any, index: number) => (
                          <div key={index} className="sub-service-item">
                            {subService}
                          </div>
                        ))}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="headerBg">
      {/* navbar */}
      <Navbar
        expand="lg"
        variant="light"
        className={`main-navbar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <Navbar.Brand href="#">
          <img className="logoImg" src={logo} alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-parent">
          <Nav className="nav-li">
            <Nav.Link href="#" onClick={handleLinkClick}>
              Home
            </Nav.Link>
            <span className="divider">/</span>

            {/* Services */}
            <div
              ref={navItemRefs.services}
              className={`services-dropdown-container ${activeDropdown === "services" ? "active" : ""
                }`}
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={() => handleMouseLeave("services")}
            >
              <Nav.Link
                href="#"
                onClick={handleLinkClick}
                className="services-link"
              >
                Services <MdKeyboardArrowDown />
              </Nav.Link>
              {activeDropdown === "services" && renderDropdownCard("services")}
            </div>
            <span className="divider">/</span>

            {/* Products */}
            <div
              ref={navItemRefs.products}
              className={`services-dropdown-container ${activeDropdown === "products" ? "active" : ""
                }`}
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={() => handleMouseLeave("products")}
            >
              <Nav.Link
                href="#"
                onClick={handleLinkClick}
                className="services-link"
              >
                Products <MdKeyboardArrowDown />
              </Nav.Link>
              {activeDropdown === "products" && renderDropdownCard("products")}
            </div>
            <span className="divider">/</span>

            {/* Digital Marketing */}
            <div
              ref={navItemRefs.digitalMarketing}
              className={`services-dropdown-container ${activeDropdown === "digitalMarketing" ? "active" : ""
                }`}
              onMouseEnter={() => handleMouseEnter("digitalMarketing")}
              onMouseLeave={() => handleMouseLeave("digitalMarketing")}
            >
              <Nav.Link
                href="#"
                onClick={handleLinkClick}
                className="services-link"
              >
                Digital Marketing <MdKeyboardArrowDown />
              </Nav.Link>
              {activeDropdown === "digitalMarketing" &&
                renderDropdownCard("digitalMarketing")}
            </div>
            <span className="divider">/</span>

            {/* Web Hosting */}
            <div
              ref={navItemRefs.webHosting}
              className={`services-dropdown-container ${activeDropdown === "webHosting" ? "active" : ""
                }`}
              onMouseEnter={() => handleMouseEnter("webHosting")}
              onMouseLeave={() => handleMouseLeave("webHosting")}
            >
              <Nav.Link
                href="#"
                onClick={handleLinkClick}
                className="services-link"
              >
                Web Hosting <MdKeyboardArrowDown />
              </Nav.Link>
              {activeDropdown === "webHosting" &&
                renderDropdownCard("webHosting")}
            </div>
            <span className="divider">/</span>

            {/* Company */}
            <div
              ref={navItemRefs.company}
              className={`services-dropdown-container ${activeDropdown === "company" ? "active" : ""
                }`}
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={() => handleMouseLeave("company")}
            >
              <Nav.Link
                href="#"
                onClick={handleLinkClick}
                className="services-link"
              >
                Company <MdKeyboardArrowDown />
              </Nav.Link>
              {activeDropdown === "company" && renderDropdownCard("company")}
            </div>
          </Nav>

          {/* ✅ Account + Apps visible only in mobile/tablet */}
          <div className="d-lg-none">
            <Row className="account-div">
              <Col xs="auto">
                <Link
                  href={
                    admin == null
                      ? user?.name != ""
                        ? route("user.dashboard")
                        : route("user.dashboard.login")
                      : admin?.name != ""
                        ? route("dashboard.home")
                        : "#"
                  }
                  className="accountBtn "
                >
                  <PiSignIn /> My Account
                </Link>
              </Col>
            </Row>
          </div>
        </Navbar.Collapse>

        {/* ✅ Account + Apps visible only on large screens */}
        <div className="d-none d-lg-flex">
          <Row className="account-div g-3">
            <Col xs="auto" className="apps-menu-wrapper" ref={dropdownRef}>
              <IoApps className="ioApps" onClick={toggleAppsMenu} />
              {showApps && (
                <div className="apps-dropdown">
                  {appItems.map((app) => (
                    <div key={app.name} className="app-item">
                      <p className="app-item-icon">{app.icon}</p>
                      <p>{app.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </Col>
            <Col xs="auto">
              <Link
                href={
                  admin == null
                    ? user?.name != ""
                      ? route("user.dashboard")
                      : route("user.dashboard.login")
                    : admin?.name != ""
                      ? route("dashboard.home")
                      : "#"
                }
                className="accountBtn"
              >
                <PiSignIn /> My Account
              </Link>
            </Col>
            <Col>
              <div className="dark-mode">
                <img src={moon} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </Navbar>

      {/*banner section */}
      <section className="banner-section">
        <div className="text-banner-parent">
          {/* left side */}
          <div className="text-banner-left">
            <div>
              <h5 className="text-banner">
                Searching for the Perfect Solution All in One Place?
              </h5>
              <h1 className="text-description">
                Complete Digital Solutions <br />
                for{" "}
                <span className="text-description-span">Web Development</span>
              </h1>
            </div>
            <div className="btnToolbar">
              <Button variant="dark" className="bannerBtn1">
                <IoCall className="IoCall" /> Book an intro call
              </Button>
              <Button variant="light" className="bannerBtn2">
                Explore Our Work
              </Button>
            </div>

            <InputGroup className="inputImg">
              <img src={banner2} alt="" />
              <img src={banner1} alt="" />
            </InputGroup>

            {/* user calculation */}
            <div className="user-parent">
              <div className="user-div">
                <h4>2500+</h4>
                <p>customers</p>
              </div>
              <div className="user-div">
                <h4>12+</h4>
                <p>Years</p>
              </div>
              <div className="user-div">
                <h4>5000+</h4>
                <p>Projects</p>
              </div>
              <div className="user-div">
                <h4>100+</h4>
                <p> Members </p>
              </div>
            </div>
          </div>
          {/* right side */}
          {/* <div>
                        <img src={group} alt="" />
                    </div> */}

          <div className="circle-container">
            <div className="center-image">
              <img src={dev} alt="center" />
            </div>

            <div className="rotating-circle">
              <div className="icon">
                <img src={icon1} alt="" />
              </div>
              <div className="icon">
                <img src={icon2} alt="" />
              </div>
              <div className="icon">
                <img src={icon3} alt="" />
              </div>
              <div className="icon">
                <img src={icon4} alt="" />
              </div>
              <div className="icon">
                <img src={icon5} alt="" />
              </div>
              <div className="icon">
                <img src={icon6} alt="" />
              </div>
              <div className="icon">
                <img src={icon7} alt="" />
              </div>
              <div className="icon">
                <img src={icon8} alt="" />
              </div>
              <div className="icon">
                <img src={icon9} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className='scrollDown-div'>
          <img src={scroll} alt="" />
          <div className='scrollIcon-div'>
            <img src={scrollIcon} alt="" />
            <p className='scroll-text'>Scroll Down</p>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
