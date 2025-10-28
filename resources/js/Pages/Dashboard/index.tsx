import { useState, useEffect, Fragment } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Col, Container, Row } from "react-bootstrap";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../Layouts";
import Widgets from "./Widgets";
import Section from "./Section";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import BestSellingProducts from "./BestSellingProducts";
// import TopSellers from "./TopSellers";
import StoreVisits from "./StoreVisits";
import RecentOrders from "./RecentOrders";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  const [rightColumn, setRightColumn] = useState<boolean>(true);
  
  const { props } = usePage();
  const flash = (props as any).flash || {};

  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

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
      <Head title="Dashboard | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widgets />
                </Row>
                <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <SalesByLocations />
                </Row>
                <Row>
                  <BestSellingProducts />
                  <BestSellingProducts />

                  {/* <TopSellers /> */}
                </Row>
                <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row>
              </div>
            </Col>
            <RecentActivity
              rightColumn={rightColumn}
              hideRightColumn={toggleRightColumn}
            />
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
