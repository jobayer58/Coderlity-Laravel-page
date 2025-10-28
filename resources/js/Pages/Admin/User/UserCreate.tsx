import { useState, Fragment, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Image,
  Dropdown,
  Alert,
  Button,
} from "react-bootstrap";
import Select from "react-select";
import { Head, useForm, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";
import bd from "../../../../images/flags/bd.svg";
import SimpleBar from "simplebar-react";
import { country } from "../../../common/data";
import "./User.css";

const SingleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Moderator", label: "Moderator" },
  { value: "Editor", label: "Editor" },
  { value: "User", label: "User" },
];

const customStyles = {
  control: (styles: any, state: any) => ({
    ...styles,
    borderColor: state.isFocused ? "#ced4da" : "#ced4da",
    "&:hover": {
      borderColor: "#ced4da",
    },
    boxShadow: "none",
    fontSize: "13px",
  }),

  placeholder: (styles: any) => ({
    ...styles,
    color: "#383E44",
  }),

  dropdownIndicator: (styles: any) => ({
    ...styles,
    color: "#383E44",
    svg: {
      width: "18px",
      height: "18px",
    },
    fontWeight: 300,
    "&:hover": {
      color: "#383E44",
    },
  }),

  clearIndicator: (styles: any) => ({
    ...styles,
    svg: {
      width: "16px",
      height: "16px",
    },
    fontWeight: 300,
    color: "#405189",
    "&:hover": { color: "#000" },
  }),
  multiValue: (styles: any, { data }: any) => {
    return {
      ...styles,
      backgroundColor: "#3762ea",
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    backgroundColor: "#405189",
    color: "white",
  }),
  multiValueRemove: (styles: any, { data }: any) => ({
    ...styles,
    color: "white",
    backgroundColor: "#405189",
    ":hover": {
      backgroundColor: "#405189",
      color: "white",
    },
  }),
};

function UserCreate() {
  const { data, setData, post, processing, errors, setError } = useForm({
    uname: "",
    email: "",
    phone: "",
    password: "",
    country: "",
    status: "",
    role: "",
    countryCode: "+880",
  });

  const { props } = usePage();
  const flash = (props as any).flash || {};

  const [selectedCountry, setSelectedCountry] = useState({
    id: 18,
    flagImg: bd,
    countryName: "Bangladesh",
    countryCode: "+880",
  });
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = (country || []).filter(
    (c) =>
      c.countryName.toLowerCase().includes(search.toLowerCase()) ||
      c.countryCode.includes(search)
  );
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const [selectedCountry1, setSelectedCountry1] = useState<any>({});
  const [searchCountry, setSearchCountry] = useState("");

  const filteredCountries = country.filter(
    (c: any) =>
      c.countryName.toLowerCase().includes(searchCountry.toLowerCase()) ||
      c.countryCode.includes(searchCountry)
  );

  const [selectedMulti2, setselectedMulti2] = useState<any>("");

  function handleMulti2(selectedMulti2: any[] = []) {
    if (selectedMulti2.length === 0) {
      setselectedMulti2("");
      setData("role", "");
      setError("role", "");
      return;
    }

    const selected =
      selectedMulti2.length >= 2 ? selectedMulti2[1] : selectedMulti2[0];

    setselectedMulti2(selected);
    setData("role", selected?.value || "");
    setError("role", "");
  }

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

  const handleSelectCountry = (c: any) => {
    setSelectedCountry(c);
    setData("countryCode", c.countryCode);
    setSearch("");
    setShow(false);
  };

  const submit = (e: any) => {
    e.preventDefault();

    post(route("admin.user.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setData({
          uname: "",
          email: "",
          phone: "",
          password: "",
          country: "",
          status: "",
          role: "",
          countryCode: "+880",
        });

        setSelectedCountry({
          id: 18,
          flagImg: bd,
          countryName: "Bangladesh",
          countryCode: "+880",
        });
        setShow(false);
        setSearch("");
        setPasswordShow(false);

        setSelectedCountry1({});
        setSearchCountry("");
        setselectedMulti2("");
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
                              <label
                                className="form-label"
                                htmlFor="passwordInput"
                              >
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Form.Control
                                  type={passwordShow ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="passwordInput"
                                  name="password"
                                  value={data.password}
                                  autoComplete="password"
                                  autoFocus
                                  onChange={(e: any) => {
                                    setData("password", e.target.value);
                                    setError("password", "");
                                  }}
                                />

                                {passwordShow ? (
                                  <i
                                    onClick={() =>
                                      setPasswordShow(!passwordShow)
                                    }
                                    className="ri-eye-fill passwordicon text-muted"
                                  ></i>
                                ) : (
                                  <i
                                    onClick={() =>
                                      setPasswordShow(!passwordShow)
                                    }
                                    className="ri-eye-off-fill passwordicon text-muted"
                                  ></i>
                                )}
                              </div>

                              {errors.password && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.password}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
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
                                          setData("country", item.countryName);
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

                              {errors.country && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.country}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="statusInput"
                                className="form-label"
                              >
                                Status
                              </Form.Label>
                              <select
                                id="statusInput"
                                className="form-select customform-select"
                                value={data.status}
                                onChange={(e) => {
                                  setData("status", e.target.value);
                                  setError("status", "");
                                }}
                                data-choices
                                data-choices-sorting="true"
                              >
                                <option>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Disabled">Disabled</option>
                              </select>

                              {errors.status && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.status}
                                </Alert>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={4}>
                            <div className="mb-3">
                              <Form.Label
                                htmlFor="roleInput"
                                className="form-label"
                              >
                                Role Type
                              </Form.Label>
                              <Select
                                id="roleInput"
                                value={selectedMulti2}
                                isMulti={true}
                                isClearable={true}
                                onChange={(selectedMulti2: any) => {
                                  handleMulti2(selectedMulti2);
                                }}
                                options={SingleOptions}
                                placeholder="Choose Role"
                                styles={customStyles}
                              />

                              {errors.role && (
                                <Alert
                                  variant="danger"
                                  className="px-6 mt-3 customPadding alert-label-icon rounded-label mb-xl-0"
                                  role="alert"
                                >
                                  <i className="ri-error-warning-line label-icon"></i>{" "}
                                  {errors.role}
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

UserCreate.layout = (page: any) => <Layout children={page} />;
export default UserCreate;
