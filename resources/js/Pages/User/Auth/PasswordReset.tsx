import { useState, Fragment, useEffect } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import AuthSlider from "./authCarousel";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordResetProps {
  status: string;
  message: string;
  id?: number;
}

function PasswordReset({ status, message, id }: PasswordResetProps) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confrimPasswordShow, setConfrimPasswordShow] =
    useState<boolean>(false);

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const { data, setData, get, post, processing, errors, setError } = useForm({
    password: "",
    cpassword: "",
    id: id,
    hashUrl: "",
  });

  const submit = (e: any) => {
    e.preventDefault();

    post(route("password.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ password: "", cpassword: "", id: 0, hashUrl: "" });
      },
    });
  };

  const handleToastMessage = (msg: string) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1500,
      onClose: () => {
        router.visit(route("user.dashboard.login"));
      },

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

  useEffect(() => {
    const lastPart = window.location.pathname.split("/")[4];
    setData("hashUrl", lastPart);
  }, []);


  return (
    <Fragment>
      <Head title="Create New Password | Coderlity Software Agency - Admin Dashboard" />
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
                        {status === "verified" ? (
                          <>
                            <p className="text-muted">
                              Your new password must be different from previous
                              used password.
                            </p>

                            <div className="p-2">
                              <form onSubmit={submit}>
                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="password-input"
                                  >
                                    Password
                                  </Form.Label>
                                  <div className="position-relative auth-pass-inputgroup">
                                    <Form.Control
                                      type={passwordShow ? "text" : "password"}
                                      className="form-control pe-5 password-input"
                                      placeholder="Enter password"
                                      id="password-input"
                                      name="password"
                                      value={data.password}
                                      autoComplete="password"
                                      onChange={(e: any) => {
                                        setData("password", e.target.value);
                                        setError("password", "");
                                      }}
                                    />

                                    <Form.Control.Feedback
                                      type="invalid"
                                      className="mt-2 d-block"
                                    >
                                      {" "}
                                      {errors.password}{" "}
                                    </Form.Control.Feedback>

                                    <Button
                                      variant="link"
                                      onClick={() =>
                                        setPasswordShow(!passwordShow)
                                      }
                                      className="top-0 position-absolute end-0 text-decoration-none text-muted password-addon"
                                      id="password-addon"
                                    >
                                      <i className="align-middle ri-eye-fill"></i>
                                    </Button>
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <Form.Label
                                    className="form-label"
                                    htmlFor="confirm-password-input"
                                  >
                                    Confirm Password
                                  </Form.Label>
                                  <div className="mb-3 position-relative auth-pass-inputgroup">
                                    <Form.Control
                                      type={
                                        confrimPasswordShow
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control pe-5 password-input"
                                      placeholder="Confirm password"
                                      id="confirm-password-input"
                                      name="cpassword"
                                      value={data.cpassword}
                                      autoComplete="cpassword"
                                      onChange={(e: any) => {
                                        setData("cpassword", e.target.value);
                                        setError("cpassword", "");
                                      }}
                                    />

                                    <Form.Control.Feedback
                                      type="invalid"
                                      className="mt-2 d-block"
                                    >
                                      {" "}
                                      {errors.cpassword}{" "}
                                    </Form.Control.Feedback>

                                    <Button
                                      variant="link"
                                      onClick={() =>
                                        setConfrimPasswordShow(
                                          !confrimPasswordShow
                                        )
                                      }
                                      className="top-0 position-absolute end-0 text-decoration-none text-muted password-addon"
                                    >
                                      <i className="align-middle ri-eye-fill"></i>
                                    </Button>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <Button
                                    variant="success"
                                    className="w-100"
                                    type="submit"
                                    disabled={processing}
                                  >
                                    Reset Password
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </>
                        ) : (
                          <>
                            <h5 className="text-primary">{message}</h5>
                            <Link
                              href={route("password.request")}
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              Back
                            </Link>{" "}
                          </>
                        )}
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
}

export default PasswordReset;
