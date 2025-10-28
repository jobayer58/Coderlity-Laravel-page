import { useState, Fragment, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Col, Container, Row } from "react-bootstrap";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../LayoutUser";
import Widgets from "./Widgets";
import Section from "./Section";

export default function Dashboard() {
  const [rightColumn, setRightColumn] = useState<boolean>(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const handleToastMessage = (msg: string) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  useEffect(() => {
    if (flash?.success) {
      const timeoutId = setTimeout(() => {
        handleToastMessage(flash?.message);
      }, 350);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [flash]);

  return (
    <Fragment>
      <Head title="Dashboard | Coderlity Software Agency - Admin Dashboard" />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widgets />
                </Row>
              </div>
            </Col>

            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

Dashboard.layout = (page: any) => <Layout children={page} />;
