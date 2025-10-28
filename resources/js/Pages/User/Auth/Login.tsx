import { Fragment, useState, useEffect } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import AuthSlider from "./authCarousel";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import "./Login.css";

const Login = () => {
  const { data, setData, post, processing, errors, setError } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const handleToastMessage = (msg: string) => {
    toast.error(msg, {
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

    post(route("user.dashboard.login.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ email: "", password: "", remember: false });
      },
    });
  };

  const handleLoginWithSocialite = (siteUrl: string) => {
    window.location.href = route("user.auth.redirect", { provider: siteUrl });
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
      <Head title="Cover SignIn | Coderlity Software Agency - Admin Dashboard" />
      <div className="py-5 auth-page-wrapper auth-bg-cover pagefont d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="overflow-hidden auth-page-content pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-4 p-lg-5">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to Coderlity.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={submit}>
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="username"
                                className="form-label"
                              >
                                Email
                              </Form.Label>
                              <Form.Control
                                id="username"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={data.email}
                                className="form-control"
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

                            <div className="mb-3">
                              <div className="float-end">
                                <Link
                                  href={route("password.request")}
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <Form.Label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </Form.Label>
                              <div className="mb-3 position-relative auth-pass-inputgroup">
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

                                <button
                                  className="top-0 btn btn-link position-absolute end-0 text-decoration-none text-muted password-addon material-shadow-none"
                                  type="button"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                  id="password-addon"
                                >
                                  <i className="align-middle ri-eye-fill"></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-check">
                              <Form.Check.Input
                                className="form-check-input"
                                type="checkbox"
                                id="auth-remember-check"
                                name="remember"
                                checked={data.remember}
                                onChange={(e: any) =>
                                  setData("remember", e.target.checked)
                                }
                              />
                              <Form.Check.Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Form.Check.Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                variant="success"
                                className="w-100"
                                type="submit"
                                disabled={processing}
                              >
                                Sign In
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="mb-4 fs-13 title">
                                  Sign In with
                                </h5>
                              </div>

                              <div>
                                <Button
                                  variant="primary"
                                  className="btn-icon me-1"
                                  onClick={() =>
                                    handleLoginWithSocialite("facebook")
                                  }
                                >
                                  <i className="ri-facebook-fill fs-16"></i>
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleLoginWithSocialite("google")
                                  }
                                  className=" btn-icon me-1"
                                >
                                  <i className="ri-google-fill fs-16"></i>
                                </Button>
                                <Button
                                  variant="dark"
                                  className="btn-icon me-1"
                                  onClick={() =>
                                    handleLoginWithSocialite("github")
                                  }
                                >
                                  <i className="ri-github-fill fs-16"></i>
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <Link
                              href={route("user.dashboard.register")}
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signup
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
                    &copy; {new Date().getFullYear()} Coderlity. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Coderlity
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

export default Login;
