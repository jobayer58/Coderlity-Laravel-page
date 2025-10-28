import { Fragment, useEffect } from "react";
import { Card, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import progileBg from "../../../../images/profile-bg.jpg";
import avatar1 from "../../../../images/users/avatar-1.jpg";
import { UserViewProps } from "../../../type/adminUserProps";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { country } from "../../../common/data";
import { Head, Link, useForm, router, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import "./User.css";
import { photoUrl } from "../../../type/globalData";

const UserProfile = ({ user }: UserViewProps) => {
  const dateStyle = new Date(user.created_at);
  const customDate = `${dateStyle.getDate()} ${dateStyle.toLocaleString(
    "en-GB",
    { month: "short" }
  )}, ${dateStyle.getFullYear()}`;

  let phoneStyle =
    user.phone.split(",").length == 2
      ? `(${user.phone.split(",")[0]}) ${user.phone.split(",")[1]}`
      : user.phone;
  let phoneCode = country.find(
    (e) => e.countryName == user.country
  )?.countryCode;

  const { data, setData, post, put, processing, errors, setError } = useForm({
    uname: user.name,
    phone: phoneStyle,
    countryCode: phoneCode,
    photo: "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const submit = (e: any) => {
    e.preventDefault();

    post(route("admin.user.profile"), {
      preserveScroll: true,
      onSuccess: () => {
        setData("photo", "");
        setError("photo", "");
      },
    });
  };

  const handleChangePasswordSubmit = (e: any) => {
    e.preventDefault();

    put(route("admin.user.changePassword"), {
      preserveScroll: true,
      onSuccess: () => {
        setData("current_password", "");
        setError("current_password", "");
        setData("password", "");
        setError("password", "");
        setData("password_confirmation", "");
        setError("password_confirmation", "");
      },
    });
  };

  const handleChangeBgPhoto = (photoData: any) => {
    router.post(
      route("admin.user.changeBackground"),
      { bgPhoto: photoData },
      {
        forceFormData: true,
      }
    );
  };

  const handleResetFrom = () => {
    router.visit(route("admin.user.profile"));
  };

  const showToast = (msg: string, type: "success" | "error") => {
    const config = {
      position: "top-center" as const,
      autoClose: type === "success" ? 1500 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light" as const,
      transition: Slide,
    };

    type === "success" ? toast.success(msg, config) : toast.warn(msg, config);
  };

  useEffect(() => {
    if (!flash?.message) return;

    const timeoutId = setTimeout(() => {
      if (flash.success) {
        showToast(flash.message, "success");
      } else if (flash.error) {
        showToast(flash.message, "error");
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [flash]);

  return (
    <Fragment>
      <Head title="Profile Settings | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img
                src={
                  user.bg_photo == "bg.png"
                    ? progileBg
                    : `${photoUrl}/admin/background/${user.bg_photo}`
                }
                className="profile-wid-img"
                alt={user.bg_photo}
              />
              <div className="overlay-content">
                <div className="p-3 text-end">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <Form.Control
                      id="profile-foreground-img-file-input"
                      type="file"
                      onChange={(e: any) => {
                        handleChangeBgPhoto(e.target.files[0]);
                      }}
                      className="profile-foreground-img-file-input"
                    />
                    <Form.Label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="align-bottom ri-image-edit-line me-1"></i>{" "}
                      Change Cover
                    </Form.Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <Card.Body className="p-4">
                  <div className="text-center">
                    <div className="mx-auto mb-4 profile-user position-relative d-inline-block">
                      <img
                        src={
                          user.photo == "avatar.png"
                            ? avatar1
                            : `${photoUrl}/admin/user/${user.photo}`
                        }
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />

                      <div className="p-0 avatar-xs rounded-circle profile-photo-edit">
                        <Form.Control
                          id="profile-img-file-input"
                          type="file"
                          onChange={(e: any) => {
                            setData("photo", e.target.files[0]);
                            setError("photo", "");
                          }}
                          className="profile-img-file-input"
                        />
                        <Form.Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Form.Label>
                      </div>
                    </div>
                    <h5 className="mb-1 fs-16">{user.name}</h5>
                    <p className="mb-0 text-muted">{`User Type / ${user.role}`}</p>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <div className="mb-5 d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="mb-0 card-title">Complete Your Profile</h5>
                    </div>
                  </div>
                  <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{
                        width: user.photo === "avatar.png" ? "85%" : "100%",
                      }}
                    >
                      <div className="label">
                        {user.photo == "avatar.png" ? "85%" : "100%"}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <Tab.Container defaultActiveKey="personal-details">
                  <Card.Header>
                    <Nav
                      className="rounded nav-tabs-custom card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="personal-details">
                          <i className="fas fa-home"></i>
                          Personal Details
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="change-password">
                          <i className="far fa-user"></i>
                          Change Password
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Tab.Content>
                      <Tab.Pane eventKey="personal-details">
                        <Form onSubmit={submit}>
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="firstnameInput"
                                  className="form-label"
                                >
                                  User Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="firstnameInput"
                                  value={data.uname}
                                  onChange={(e: any) => {
                                    setData("uname", e.target.value);
                                    setError("uname", "");
                                  }}
                                  placeholder="Enter your firstname"
                                />

                                {errors.uname && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.uname}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="emailInput"
                                  className="form-label"
                                >
                                  Email Address
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  className="form-control"
                                  id="emailInput"
                                  value={user.email}
                                  readOnly={true}
                                  placeholder="Enter your email"
                                />
                              </div>
                            </Col>

                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="phonenumberInput"
                                  className="form-label"
                                >
                                  Phone Number
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="phonenumberInput"
                                  value={data.phone}
                                  onChange={(e: any) => {
                                    setData("phone", e.target.value);
                                    setError("phone", "");
                                  }}
                                  placeholder="Enter your phone number"
                                />

                                {errors.phone && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.phone}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="countryInput"
                                  className="form-label"
                                >
                                  Country
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="countryInput"
                                  readOnly={true}
                                  value={user.country}
                                  placeholder="Country"
                                />
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="JoiningdatInput"
                                  className="form-label"
                                >
                                  Joining Date
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="JoiningdatInput"
                                  value={customDate}
                                  readOnly={true}
                                  placeholder="Enter your email"
                                />
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="skillsInput"
                                  className="form-label"
                                >
                                  Status
                                </Form.Label>
                                <select
                                  defaultValue={user.status}
                                  onMouseDown={(e) => e.preventDefault()}
                                  className="mb-3 form-select dropdownstop"
                                >
                                  <option value={user.status}>Active</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="designationInput"
                                  className="form-label"
                                >
                                  Designation
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="designationInput"
                                  readOnly={true}
                                  placeholder="Designation"
                                  value={`User Type / ${user.role}`}
                                />
                              </div>
                            </Col>

                            <Col lg={6}>
                              <div className="mb-3">
                                <Form.Label
                                  htmlFor="websiteInput1"
                                  className="form-label"
                                >
                                  Website
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  readOnly={true}
                                  className="form-control"
                                  id="websiteInput1"
                                  placeholder="www.example.com"
                                  value="www.coderlity.com"
                                />

                                {errors.photo && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.photo}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="gap-2 hstack justify-content-end">
                                <button
                                  type="submit"
                                  disabled={processing}
                                  className="btn btn-primary"
                                >
                                  Update
                                </button>

                                <button
                                  type="button"
                                  onClick={handleResetFrom}
                                  className="btn btn-soft-success"
                                >
                                  Cancel
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="change-password">
                        <Form onSubmit={handleChangePasswordSubmit}>
                          <Row className="g-2">
                            <Col lg={4}>
                              <div>
                                <Form.Label
                                  htmlFor="current_password"
                                  className="form-label"
                                >
                                  Old Password*
                                </Form.Label>
                                <Form.Control
                                  id="current_password"
                                  type="password"
                                  name="current_password"
                                  className="form-control"
                                  value={data.current_password}
                                  onChange={(e: any) => {
                                    setData("current_password", e.target.value);
                                    setError("current_password", "");
                                  }}
                                  placeholder="Enter current password"
                                />

                                {errors.current_password && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.current_password}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={4}>
                              <div>
                                <Form.Label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  New Password*
                                </Form.Label>
                                <Form.Control
                                  id="password"
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  value={data.password}
                                  onChange={(e: any) => {
                                    setData("password", e.target.value);
                                    setError("password", "");
                                  }}
                                  placeholder="Enter new password"
                                />

                                {errors.password && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.password}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={4}>
                              <div>
                                <Form.Label
                                  htmlFor="password_confirmation"
                                  className="form-label"
                                >
                                  Confirm Password*
                                </Form.Label>
                                <Form.Control
                                  id="password_confirmation"
                                  type="password"
                                  name="password_confirmation"
                                  className="form-control"
                                  value={data.password_confirmation}
                                  onChange={(e: any) => {
                                    setData(
                                      "password_confirmation",
                                      e.target.value
                                    );
                                    setError("password_confirmation", "");
                                  }}
                                  placeholder="Confirm password"
                                />

                                {errors.password_confirmation && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.password_confirmation}
                                  </Form.Control.Feedback>
                                )}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  type="submit"
                                  disabled={processing}
                                  className="btn btn-success"
                                >
                                  Change Password
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Tab.Container>
              </Card>
            </Col>
          </Row>

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
        </Container>
      </div>
    </Fragment>
  );
};
UserProfile.layout = (page: any) => <Layout children={page} />;

export default UserProfile;
