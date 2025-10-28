import "./Hosting.css";
import { Button, Card, Container } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";

const plans = [
  {
    title: "Starter",
    price: "$19.99/m",
    subtitle: "Shared Hosting",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Unmetered Traffic",
      "10 GB SSD Storage",
    ],
    footer: "Perfect for new blogs & personal sites",
  },
  {
    title: "Starter Business",
    price: "$19.99",
    subtitle: "Monthly subscription",
    features: [
      "50 Website",
      "100 GB NVMe Storage",
      "Priority Support",
      "Daily Backups",
    ],
    footer: "E-commerce & Growing Projects",
  },
  {
    title: "Professional",
    price: "$19.99",
    subtitle: "Monthly subscription",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Unmetered Traffic",
      "10 GB SSD Storage",
    ],
    footer: "Agencies, High-Traffic Sites",
  },
];

const Hosting = () => {
  return (
    <section className="">
      {/* content */}
      <div className="domain-content">
        <div className="domain-content-text">
          <h1>Featured Hosting Plans</h1>
          <p>Find the perfect performance and price for your website.</p>
        </div>
        {/* card */}
        <div className="card-section">
          {/* card-1 */}
          <section className="pricing-section">
            <Container className="pricing-container">
              {plans.map((plan, index) => (
                <Card key={index} className="pricing-card ">
                  <Card.Body>
                    <h5 className="pricing-title">{plan.title}</h5>
                    <div className="pricing-divider"></div>
                    <h2 className="pricing-price">{plan.price}</h2>
                    <p className="pricing-subtitle">{plan.subtitle}</p>
                    <Button variant="primary" className="pricing-btn">
                      Get Started
                    </Button>
                    <ul className="pricing-list">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="pricing-list-item">
                          <BsCheckCircleFill className="pricing-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="pricing-footer">{plan.footer}</p>
                  </Card.Body>
                </Card>
              ))}
            </Container>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Hosting;
