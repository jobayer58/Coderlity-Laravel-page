import { useEffect, Fragment } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthSlider from "./authCarousel";
import "./Login.css";
import { Head, usePage, useForm } from "@inertiajs/react";

const Authorization = () => {
  const { data, errors, post, setData, processing, setError } = useForm({
    otp: "",
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
      }, 350);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [flash]);

  const handleLogout = () => {
    post(route("logout"));
  };

  const handleEmailResend = () => {
    post(route("user.resend.otp"));
  };

  const submit = (e: any) => {
    e.preventDefault();

    post(route("verification.confirm"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ otp: "" });
      },
    });
  };

  return (
    <Fragment>
      <Head title="Cover SignUp | Coderlity Software Agency - Admin Dashboard" />
      <div className="py-5 auth-page-wrapper auth-bg-cover pagefont d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="overflow-hidden auth-page-content pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="m-0 overflow-hidden">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-4 p-lg-5">
                        <div>
                          <h5 className="text-primary">Register Account</h5>
                          <p className="text-muted">
                            Get your Free Coderlity account now.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={submit}>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Otp code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter otp"
                                value={data.otp}
                                onChange={(e: any) => {
                                  setData("otp", e.target.value);
                                  setError("otp", "");
                                }}
                              />

                              <Form.Control.Feedback
                                type="invalid"
                                className="mt-2 d-block"
                              >
                                {" "}
                                {errors.otp}{" "}
                              </Form.Control.Feedback>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                type="submit"
                                disabled={processing}
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            <button
                              onClick={handleLogout}
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              Log out
                            </button>{" "}
                          </p>

                          <div className="mt-4 text-center">
                            <p className="mb-0">
                              Didn't receive a code ?{" "}
                              <button
                                onClick={handleEmailResend}
                                className="fw-semibold text-primary text-decoration-underline"
                              >
                                Resend
                              </button>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

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
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">
                    {new Date().getFullYear()} Coderlity. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Coderlity
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </Fragment>
  );
};

export default Authorization;
