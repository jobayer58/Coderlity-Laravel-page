import { Fragment, useEffect } from "react";
import "./Login.css";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import AuthSlider from "./authCarousel";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

const ForgotPassword = () => {
  const { data, setData, post, processing, errors, setError } = useForm({
    email: "",
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

  const submit = (e: any) => {
    e.preventDefault();

    post(route("password.email"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ email: "" });
      },
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
      <Head title="Reset Password | Coderlity Software Agency - Admin Dashboard" />
      <div className="py-5 auth-page-wrapper auth-bg-cover d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="overflow-hidden auth-page-content pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-4 p-lg-5">
                        <h5 className="text-primary">Forgot Password?</h5>
                        <p className="text-muted">Reset password with velzon</p>

                        <div className="mt-2 text-center">
                          <i className="ri-mail-send-line display-5 text-success"></i>
                        </div>

                        <div
                          className="mx-2 mb-2 text-center border-0 alert alert-warning"
                          role="alert"
                        >
                          Enter your email and instructions will be sent to you!
                        </div>
                        <div className="p-2">
                          <form onSubmit={submit}>
                            <div className="mb-4">
                              <Form.Label className="form-label">
                                Email
                              </Form.Label>
                              <Form.Control
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email address"
                                name="email"
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                                onChange={(e: any) => {
                                  setData("email", e.target.value);
                                  setError("email", "");
                                }}
                              />

                              <Form.Control.Feedback
                                type="invalid"
                                className="mt-2 d-block"
                              >
                                {" "}
                                {errors.email}{" "}
                              </Form.Control.Feedback>
                            </div>

                            <div className="mt-4 text-center">
                              <Button
                                variant="success"
                                className="w-100"
                                type="submit"
                                disabled={processing}
                              >
                                Send Reset Link
                              </Button>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Wait, I remember my password...{" "}
                            <Link
                              href={route("user.dashboard.login")}
                              className="fw-bold text-primary text-decoration-underline"
                            >
                              {" "}
                              Click here{" "}
                            </Link>{" "}
                          </p>
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
            <Row>
              <Col lg={12}>
                <div className="text-center">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Velzon. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
