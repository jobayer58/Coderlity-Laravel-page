import ProcessTimeline from "../../Component/Frontend/home/ProcessTimeline";
import DigitalSolution from "../../Component/Frontend/home/DigitalSolution";
import Featured from "../../Component/Frontend/home/Featured";
import Sponsored from "../../Component/Frontend/home/Sponsored";
import TopProducts from "../../Component/Frontend/home/TopProducts";
import HomeLayout from "../../HomeLayout/HomeLayout";
import DomainBanner from "./../../Component/Frontend/home/DomainBanner";
import WorkProcess from "../../Component/Frontend/home/WorkProcess";
import FAQ from "../../Component/Frontend/home/FAQ";
import OurBlog from "../../Component/Frontend/home/OurBlog";
import { Head } from "@inertiajs/react";

import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Technologies from "../../Component/Frontend/home/Technologies";
import Testimonials from "../../Component/Frontend/home/Testimonials";

function Site() {
  const [modalPasswordReset, setModalPasswordReset] = useState<boolean>(false);

  useEffect(() => {
    setModalPasswordReset(true);
  }, []);

  return (
    <HomeLayout>
      <Head title="Coderlity Software Agency" />

      <DomainBanner />
      <TopProducts />
      <Sponsored />
      <Featured />
      <DigitalSolution />
      <ProcessTimeline />
      {/* <WorkProcess /> */}
      <Technologies/>
      <FAQ />
      <Testimonials/>
      <OurBlog />

      <Modal
        id="flipModal"
        show={modalPasswordReset}
        onHide={() => setModalPasswordReset(false)}
        className="flip"
      >
        <Modal.Header closeButton>
          <Modal.Title>Website Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="fs-16">Site Status</h5>
          <p className="text-muted">{`We’re working hard to bring you something awesome. 
          Our website will be live very soon!`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setModalPasswordReset(false)}>
            {" "}
            Close{" "}
          </Button>
          <Button
            type="button"
            onClick={() => setModalPasswordReset(false)}
            variant="primary"
          >
            {" "}
            Ok{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </HomeLayout>
  );
}

export default Site;
