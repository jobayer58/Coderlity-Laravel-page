import { Fragment, useState } from "react";
import { Head, useForm } from "@inertiajs/react";

import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import AuthSlider from "./authCarousel";
import "./Login.css";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const { data, setData, post, processing, errors, setError } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const handlePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  const submit = (e: any) => {
    e.preventDefault();

    post(route("admin.dashboard.login.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({ email: "", password: "", remember: false });
      },
    });
  };

  return (
    <Fragment>
      <Head title="Cover SignIn | Coderlity Software Agency - Admin Dashboard" />
      <div className="py-5 auth-page-wrapper pagefont auth-bg-cover d-flex justify-content-center align-items-center min-vh-100">
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

                                {passwordShow ? (
                                  <i
                                    onClick={handlePasswordVisibility}
                                    className="ri-eye-fill passwordicon text-muted"
                                  ></i>
                                ) : (
                                  <i
                                    onClick={handlePasswordVisibility}
                                    className="ri-eye-off-fill passwordicon text-muted"
                                  ></i>
                                )}
                              </div>

                              {errors.password && (
                                <Form.Control.Feedback
                                  type="invalid"
                                  className="mt-2 d-block"
                                >
                                  {errors.password}
                                </Form.Control.Feedback>
                              )}
                            </div>

                            <div className="mt-3 form-check">
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
                          </form>
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
