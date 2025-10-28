import { Fragment, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Button,
} from "react-bootstrap";
import { Head, useForm, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";

function ContactCreate() {
  const { data, setData, post, processing, errors, setError } = useForm({
    uname: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  });
 
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
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [flash]);

  const submit = (e: any) => {
    e.preventDefault();
 
    post(route("admin.contact.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({
          uname: "",
          email: "",
          phone: "",
          service: "",
          address: "",
          message: "",
        });
      },
    });
  };
 
  return (
    <Fragment>
      <Head title="Starter | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <CLBreadCrumb
            title="Users"
            pageTitle="User Page"
            pageUrl="/auth/console/user"
            currentPage="Create"
          />
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header className="align-items-center d-flex">
                  <h4 className="mb-0 card-title flex-grow-1">User Create</h4>
                </Card.Header>

                <Card.Body>
                  <div className="live-preview">
                    <form onSubmit={submit}>
                      <Row>
                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="userNameinput"
                                className="form-label"
                              >
                                Name
                              </Form.Label>
                              <Form.Control
                                id="userNameinput"
                                type="text"
                                value={data.uname}
                                className="form-control"
                                placeholder="Enter your name"
                                onChange={(e: any) => {
                                  setData("uname", e.target.value);
                                  setError("uname", "");
                                }}
                              />

                              {errors.uname && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.uname}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <label
                                htmlFor="emailidInput"
                                className="form-label"
                              >
                                Email Address
                              </label>
                              <div className="form-icon right">
                                <input
                                  id="emailidInput"
                                  type="email"
                                  value={data.email}
                                  className="form-control form-control-icon"
                                  placeholder="example@gmail.com"
                                  onChange={(e: any) => {
                                    setData("email", e.target.value);
                                    setError("email", "");
                                  }}
                                />
                                <i className="ri-mail-unread-line"></i>
                              </div>
                              {errors.email && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.email}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <label htmlFor="phone" className="form-label">
                                Phone
                              </label>
                              <div className="form-icon right">
                                <input
                                  id="phone"
                                  type="text"
                                  value={data.phone}
                                  className="form-control form-control-icon"
                                  placeholder="01736521478"
                                  onChange={(e: any) => {
                                    setData("phone", e.target.value);
                                    setError("phone", "");
                                  }}
                                />
                                <i className="ri-mail-unread-line"></i>
                              </div>
                              {errors.phone && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.phone}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <label htmlFor="address" className="form-label">
                                Address
                              </label>
                              <div className="form-icon right">
                                <input
                                  id="address"
                                  type="text"
                                  value={data.address}
                                  className="form-control form-control-icon"
                                  placeholder=""
                                  onChange={(e: any) => {
                                    setData("address", e.target.value);
                                  }}
                                />
                                <i className="ri-mail-unread-line"></i>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="serviceInput"
                                className="form-label"
                              >
                                Service
                              </Form.Label>
                              <select
                                id="serviceInput"
                                className="form-select customform-select"
                                value={data.service}
                                onChange={(e) => {
                                  setData("service", e.target.value);
                                  setError("service", "");
                                }}
                                data-choices
                                data-choices-sorting="true"
                              >
                                <option>Select Service</option>
                                <option value="Web Application">
                                  Web Application
                                </option>
                                <option value="Mobile Application">
                                  Mobile Application
                                </option>
                                <option value="UI/UX Design">
                                  UI/UX Design
                                </option>
                                <option value="Digital Marketing">
                                  Digital Marketing
                                </option>
                              </select>

                              {errors.service && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.service}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>



                        
                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <label htmlFor="message" className="form-label">
                                Message
                              </label>
                              <div className="form-icon right">
                                <input
                                  id="message"
                                  type="text"
                                  value={data.message}
                                  className="form-control form-control-icon"
                                  placeholder=""
                                  onChange={(e: any) => {
                                    setData("message", e.target.value);
                                    setError("message", "");
                                  }}
                                />
                                <i className="ri-mail-unread-line"></i>
                              </div>
                              {errors.message && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.message}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>


                        <Col md={12}>
                          <div className="">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={processing}
                              className="btn-load"
                            >
                              <span className="d-flex align-items-center">
                                {processing ? (
                                  <>
                                    <span
                                      className="flex-shrink-0 spinner-border"
                                      role="status"
                                    ></span>
                                    <span className="flex-grow-1 ms-2">
                                      Loading...
                                    </span>
                                  </>
                                ) : (
                                  "Submit"
                                )}
                              </span>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <ToastContainer
          position="top-right"
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
      </div>
    </Fragment>
  );
}

ContactCreate.layout = (page: any) => <Layout children={page} />;
export default ContactCreate;
