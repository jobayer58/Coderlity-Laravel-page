import { Head, Link } from "@inertiajs/react";
import error400cover from "../../../images/error400-cover.png";
import { Col, Container, Row } from "react-bootstrap";
import { Fragment } from "react";
 
export default function Error404() {
  return (
    <Fragment>
      <Head title="404 Error Cover | Velzon - React Admin & Dashboard Template" />
      <div className="auth-page-content">
        <div className="py-5 auth-page-wrapper d-flex justify-content-center align-items-center min-vh-100">
          <div className="p-0 overflow-hidden auth-page-content">
            <Container>
              <Row className="justify-content-center">
                <Col xl={7} lg={8}>
                  <div className="text-center">
                    <img
                      src={error400cover}
                      alt="error img"
                      className="img-fluid"
                    />
                    <div className="mt-3">
                      <h3 className="text-uppercase">Sorry, Page not Found</h3>
                      <p className="mb-4 text-muted">
                        The page you are looking for not available!
                      </p>
                      <Link href="http://127.0.0.1:8000/auth/console" className="btn btn-success">
                        <i className="mdi mdi-home me-1"></i>Back to home
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
