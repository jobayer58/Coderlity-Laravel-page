import { Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  Image,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import progileBg from "../../../../images/profile-bg.jpg";
import avatar1 from "../../../../images/users/avatar-1.jpg";
import { UserViewProps, ProgressArray } from "../../../type/userProps";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleBar from "simplebar-react";
import { country } from "../../../common/data";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import Layout from "../../../LayoutUser";
import bd from "../../../../images/flags/bd.svg";
import { photoUrl } from "../../../type/globalData";
import "./Customer.css";

const UserProfile = ({ user }: UserViewProps) => {
  const dateStyle = new Date(user.created_at);
  const customDate = `${dateStyle.getDate()} ${dateStyle.toLocaleString(
    "en-GB",
    { month: "short" }
  )}, ${dateStyle.getFullYear()}`;

  let setUserCountryObj =
    country.find((e) => e.countryName == user.country) || ({} as any);
    
  let setUserPhoneObj = country.find((e) => e.countryName == user.country) || {
    id: 18,
    flagImg: bd,
    countryName: "Bangladesh",
    countryCode: "+880",
  };

  const { data, setData, post, put, processing, errors, setError } = useForm({
    name: user.name,
    phone: user.phone || "",
    country: user.country || "",
    phoneCountry: user.country || "Bangladesh",
    address: user.address || "",
    photo: "",
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(setUserPhoneObj);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = (country || []).filter(
    (c) =>
      c.countryName.toLowerCase().includes(search.toLowerCase()) ||
      c.countryCode.includes(search)
  );

  const [selectedCountry1, setSelectedCountry1] =
    useState<any>(setUserCountryObj);
  const [searchCountry, setSearchCountry] = useState("");

  const filteredCountries = country.filter(
    (c: any) =>
      c.countryName.toLowerCase().includes(searchCountry.toLowerCase()) ||
      c.countryCode.includes(searchCountry)
  );

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const submit = (e: any) => {
    e.preventDefault();

    post(route("user.dashboard.profileUpdate"), {
      preserveScroll: true,
      onSuccess: () => {
        setData("photo", "");
        setError("photo", "");
      },
    });
  };

  const handleChangePasswordSubmit = (e: any) => {
    e.preventDefault();

    put(route("user.dashboard.profile.changePassword"), {
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
      route("user.dashboard.profile.changeBg"),
      { bgPhoto: photoData },
      {
        forceFormData: true,
      }
    );
  };

  const handleResetFrom = () => {
    router.visit(route("user.dashboard.profile"));
  };

  const handleSelectCountry = (c: any) => {
    setSelectedCountry(c);
    setData("phoneCountry", c.countryName);
    setSearch("");
    setShow(false);
  };


const fields: Array<keyof ProgressArray> = ["phone", "country", "address", "photo"];

  // Count how many fields are filled
  const filledCount = fields.reduce((count, field) => {
    if (user[field] && user[field] !== "" && user[field] !== "avatar.png") {
      return count + 1;
    }
    return count;
  }, 0);

  let progress = 65;

  const step = 35 / fields.length;
  progress += filledCount * step;
  
  progress = Math.round(progress);

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
      <Head title="Profile Settings | Coderlity Software Agency - Admin Dashboard" />
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img
                src={
                  user.bg_photo == "bg.png"
                    ? progileBg
                    : `${photoUrl}/customer/background/${user.bg_photo}`
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
                            : `${photoUrl}/customer/user/${user.photo}`
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
                       style={{ width: `${progress}%` }}
                    >
                      <div className="label">
                       {progress}%
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

                      {user.provider_token == null && (
                        <Nav.Item>
                          <Nav.Link eventKey="change-password">
                            <i className="far fa-user"></i>
                            Change Password
                          </Nav.Link>
                        </Nav.Item>
                      )}
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
                                  Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="firstnameInput"
                                  value={data.name}
                                  onChange={(e: any) => {
                                    setData("name", e.target.value);
                                    setError("name", "");
                                  }}
                                  placeholder="Enter your firstname"
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
                                <Form.Label htmlFor="phoneNumberInput">
                                  Phone Number
                                </Form.Label>

                                <Dropdown
                                  show={show}
                                  onToggle={(nextShow) => setShow(nextShow)}
                                  className="input-group"
                                >
                                  <Dropdown.Toggle
                                    as="button"
                                    type="button"
                                    className="border btn btn-light arrow-none"
                                  >
                                    <img
                                      src={selectedCountry.flagImg}
                                      alt="country flag"
                                      className="options-flagimg"
                                      height="20"
                                    />
                                    <span className="countrylist-codeno text-muted ms-2">
                                      {selectedCountry.countryCode}
                                    </span>
                                  </Dropdown.Toggle>

                                  {/* Phone input (use type="tel" so + is allowed) */}
                                  <input
                                    type="tel"
                                    id="phoneNumberInput"
                                    value={data.phone}
                                    onChange={(e) => {
                                      setData("phone", e.target.value);
                                      setError("phone", "");
                                    }}
                                    className="form-control rounded-end flag-input"
                                    placeholder="1745 145199"
                                  />

                                  {/* Dropdown menu: search + list */}
                                  <Dropdown.Menu
                                    as="div"
                                    className="mb-0 list-unstyled w-100 dropdown-menu-list"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* Search input placed INSIDE the menu - use Form.Control (not Form.Label) */}
                                    <div className="p-2 px-3 pt-1 searchlist-input">
                                      <Form.Control
                                        type="text"
                                        className="form-control-sm search-countryList"
                                        placeholder="Search country name or country code..."
                                        value={search}
                                        onChange={(e) =>
                                          setSearch(e.target.value)
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    </div>

                                    <SimpleBar
                                      style={{ maxHeight: "220px" }}
                                      className=""
                                    >
                                      {(filtered || []).map((item, index) => (
                                        <Dropdown.Item
                                          as="div"
                                          key={index}
                                          onClick={() =>
                                            handleSelectCountry(item)
                                          }
                                          className="dropdown-item d-flex"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div className="flex-shrink-0 me-2">
                                            <img
                                              src={item.flagImg}
                                              alt="country flag"
                                              className="options-flagimg"
                                              height="20"
                                            />
                                          </div>
                                          <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between">
                                              <div className="country-name me-1">
                                                {item.countryName}
                                              </div>
                                              <span className="countrylist-codeno text-muted">
                                                {item.countryCode}
                                              </span>
                                            </div>
                                          </div>
                                        </Dropdown.Item>
                                      ))}
                                    </SimpleBar>
                                  </Dropdown.Menu>
                                </Dropdown>

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
                                <Form.Label htmlFor="countryinput">
                                  Country
                                </Form.Label>

                                <Dropdown className="w-100">
                                  <Dropdown.Toggle
                                    as="button"
                                    type="button"
                                    id="countryinput"
                                    className="cTogglePadding form-control d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex align-items-center">
                                      {selectedCountry1.flagImg && (
                                        <Image
                                          src={selectedCountry1.flagImg}
                                          alt="country flag"
                                          height={20}
                                          width={30}
                                          className="me-2"
                                        />
                                      )}
                                      <span>
                                        {selectedCountry1.countryName ||
                                          "Select country"}
                                      </span>
                                    </div>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu
                                    as="ul"
                                    className="mb-0 list-unstyled w-100 dropdown-menu-list"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {/* Search bar */}

                                    <div className="px-3 py-2 searchlist-input">
                                      <Form.Control
                                        type="text"
                                        placeholder="Search country name or code..."
                                        className="form-control-sm search-countryList"
                                        value={searchCountry}
                                        onChange={(e) =>
                                          setSearchCountry(e.target.value)
                                        }
                                      />
                                    </div>

                                    {/* Country list */}
                                    <SimpleBar style={{ maxHeight: "220px" }}>
                                      {filteredCountries.map((item, index) => (
                                        <Dropdown.Item
                                          as="li"
                                          onClick={() => {
                                            setSelectedCountry1(item);
                                            setSearchCountry("");
                                            setData(
                                              "country",
                                              item.countryName
                                            );
                                            setError("country", "");
                                          }}
                                          key={index}
                                          className="dropdown-item customPaddingLi d-flex"
                                        >
                                          <div className="flex-shrink-0">
                                            <Image
                                              src={item.flagImg}
                                              alt="country flag"
                                              className="options-flagimg"
                                              height={20}
                                              width={30}
                                            />
                                          </div>
                                          <div className="flex-grow-1">
                                            <div className="d-flex">
                                              <div className="country-name ">
                                                {item.countryName}
                                              </div>
                                              <span className="countrylist-codeno text-muted">
                                                {item.countryCode}
                                              </span>
                                            </div>
                                          </div>
                                        </Dropdown.Item>
                                      ))}
                                    </SimpleBar>
                                  </Dropdown.Menu>
                                </Dropdown>
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
                                  Address
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="designationInput"
                                  placeholder="address"
                                  value={data.address}
                                  onChange={(e: any) => {
                                    setData("address", e.target.value);
                                    setError("address", "");
                                  }}
                                />

                                {errors.address && (
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="mt-2 d-block"
                                  >
                                    {errors.address}
                                  </Form.Control.Feedback>
                                )}
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

                      {user.provider_token == null && (
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
                                      setData(
                                        "current_password",
                                        e.target.value
                                      );
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
                      )}
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
