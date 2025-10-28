import { useState, Fragment } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import AuthSlider from "./authCarousel";
import "./Login.css";
import { Head, Link, useForm } from "@inertiajs/react";

const Register = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const { data, setData, post, processing, errors, setError } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginWithSocialite = (siteUrl: string) => {
    window.location.href = route("user.auth.redirect", { provider: siteUrl });
  };

  const submit = (e: any) => {
    e.preventDefault();

    post(route("user.dashboard.register.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ name: "", email: "", password: "" });
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
                            Get your Free Coderlity account now....
                          </p>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={submit}>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter name"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                onChange={(e: any) => {
                                  setData("name", e.target.value);
                                  setError("name", "");
                                }}
                              />
                              {errors.name && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="mt-2 d-block"
                                >
                                  {errors.name}
                                </Form.Control.Feedback>
                              )}
                            </div>

                            <div className="mb-3">
                              <label htmlFor="useremail" className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="useremail"
                                placeholder="Enter email address"
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                                onChange={(e: any) => {
                                  setData("email", e.target.value);
                                  setError("email", "");
                                }}
                              />
                              {errors.email && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="mt-2 d-block"
                                >
                                  {errors.email}
                                </Form.Control.Feedback>
                              )}
                            </div>

                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Form.Control
                                  type={passwordShow ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  name="password"
                                  value={data.password}
                                  autoComplete="password"
                                  autoFocus
                                  onChange={(e: any) => {
                                    setData("password", e.target.value);
                                    setError("password", "");
                                  }}
                                />
                                {errors.password && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.password}
                                  </Form.Control.Feedback>
                                )}
                                <Button
                                  variant="link"
                                  onClick={() => setPasswordShow(!passwordShow)}
                                  className="top-0 position-absolute end-0 text-decoration-none text-muted password-addon material-shadow-none"
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="align-middle ri-eye-fill"></i>
                                </Button>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="mb-0 fs-12 text-muted fst-italic">
                                By registering you agree to the Coderlity{" "}
                                <Link
                                  href="#"
                                  className="text-primary text-decoration-underline fst-normal fw-medium ms-2"
                                >
                                  Terms of Use
                                </Link>
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                type="submit"
                                disabled={processing}
                              >
                                Sign Up
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="mb-4 fs-13 title text-muted">
                                  Create account with
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
                            Already have an account ?{" "}
                            <Link
                              href={route("user.dashboard.login")}
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Signin
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
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

export default Register;
