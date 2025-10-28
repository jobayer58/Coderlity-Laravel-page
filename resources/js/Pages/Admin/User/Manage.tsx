import { useState, FormEventHandler, Fragment, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Button,
  Row,
  Modal,
  Table,
} from "react-bootstrap";
import { Head, router, Link, useForm, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";
import CLPagination from "../../../Component/Backend/CLPagination";
import { AdminUserProps } from "../../../type/adminUserProps";
import { siteBaseUrl } from "../../../type/globalData";
import CLModal from "../../../Component/Backend/CLModal";
import { country } from "../../../common/data";
import "../../../css/customStyle.css";
import "./User.css";

function Manage({ users, pages = [] }: AdminUserProps) {
  const [modalFlip, setModalFlip] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const [modalPasswordReset, setModalPasswordReset] = useState<boolean>(false);
  const [userPasswordResetId, setUserPasswordResetId] = useState<number>(0);

  const { props } = usePage();
  const flash = (props as any).flash || {};

  let url = new URL(window.location.href);
  let searchInput = url.searchParams.get("search") || "";

  const { data, post, get, setData, processing, put } = useForm({
    search: searchInput,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (data.search.length >= 2) {
      get(route("admin.user.index", { page: 1, search: data.search }), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const handleModalState = (data: string) => {
    if (data === "2") {
      setUserId(0);
      setModalFlip(false);
    } else {
      setModalFlip(false);
    }
  };

  const handleModalPasswordReset = () => {
    post(route("admin.user.forgotPassword", { id: userPasswordResetId }), {
      preserveScroll: true,
      onSuccess: () => {
        setModalPasswordReset(false);
        setUserPasswordResetId(0);
      },
    });
  };

  const handleResetTable = () => {
    if (data.search.length !== 0) {
      setData({ search: "" });
      router.visit(`${siteBaseUrl}/user`, {
        method: "get",
      });
    }
  };

  const handleStatusChange = (userId: number) => {
    put(route("admin.user.statusUpdate", userId), {
      preserveScroll: true,
    });
  };

  const handleToastMessage = (msg: string) => {
    toast.success(msg, {
      position: "top-right",
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

  const handleUserView = (userId: number) => {
    router.visit(route("admin.user.show", { id: userId }));
  };

  const handleUserEdit = (userId: number) => {
    router.visit(route("admin.user.edit", { id: userId }));
  };

  useEffect(() => {
    if (flash?.success) {
      const timeoutId = setTimeout(() => {
        handleToastMessage(flash?.message);
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [flash]);

  return (
    <Fragment>
      <Head title="Starter | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <CLBreadCrumb
            title="Users"
            pageTitle="User Page"
            pageUrl="/auth/console/user"
            currentPage="Manage"
          />
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header className="align-items-center d-flex">
                  <h4 className="mb-0 card-title flex-grow-1">User Manage</h4>
                  <div className="flex-shrink-0">
                    <div className="d-flex justify-content-sm-end">
                      <form onSubmit={submit}>
                        <div className="search-box ms-2 search-box-custom-width ">
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email, country or role..."
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            disabled={processing}
                          />
                          <i className="ri-search-line search-icon"></i>

                          {data?.search?.length !== 0 && (
                            <i
                              className="ri-close-line close-cl-icon text-danger"
                              onClick={handleResetTable}
                            ></i>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="mb-0 align-middle table-bordered table-hover table-striped table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Country</th>
                            <th scope="col">Status</th>
                            <th scope="col">Change Status</th>
                            <th scope="col">Role</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users?.data?.length !== 0 &&
                            users?.data?.map((item, index) => (
                              <tr key={index}>
                                <td className="fw-medium">
                                  {(users.current_page - 1) * 10 + index + 1}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                  {country.find(
                                    (e) => e.countryName == item.country
                                  )?.flagImg && (
                                    <img
                                      src={
                                        country.find(
                                          (e) => e.countryName == item.country
                                        )?.flagImg
                                      }
                                      alt="country flag"
                                      className="options-flagimg options-flagimgTwo changebgcolor"
                                      height="20"
                                    />
                                  )}

                                  {item.country}
                                </td>
                                <td>
                                  {item.status === "Active" ? (
                                    <span className="badge bg-success-subtle text-success">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger-subtle text-danger">
                                      Disabled
                                    </span>
                                  )}
                                </td>

                                <td>
                                  <div className="form-check form-switch">
                                    <Form.Check.Input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={item.status === "Disabled"}
                                      onChange={() =>
                                        handleStatusChange(item.id)
                                      }
                                      role="switch"
                                      id="SwitchCheck2"
                                    />
                                    <Form.Check.Label
                                      className="form-check-label ms-2"
                                      htmlFor="SwitchCheck2"
                                    >
                                      Yes/No
                                    </Form.Check.Label>
                                  </div>
                                </td>

                                <td>{item.role}</td>
                                <td className="cursor-pointer text-primary">
                                  <span
                                    onClick={() => {
                                      setModalPasswordReset(true);
                                      setUserPasswordResetId(item.id);
                                    }}
                                  >
                                    <i className="align-middle ri-refresh-line fs-17"></i>{" "}
                                    Reset Password
                                  </span>
                                </td>

                                <td>
                                  <div className="flex-wrap gap-3 hstack">
                                    <span
                                      onClick={() => handleUserView(item.id)}
                                      className="cursor-pointer link-primary fs-15"
                                    >
                                      <i className="ri-eye-line"></i>
                                    </span>

                                    <span
                                      onClick={() => handleUserEdit(item.id)}
                                      className="link-success fs-15"
                                    >
                                      <i className="ri-edit-2-line"></i>
                                    </span>
                                    <span
                                      onClick={() => {
                                        setUserId(item.id);
                                        setModalFlip(!modalFlip);
                                      }}
                                      className="link-danger fs-15"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}

                          {users?.data?.length === 0 && (
                            <tr>
                              <td
                                colSpan={9}
                                align="center"
                                className="text-center fs-6 fw-semibold"
                              >
                                No data is available for this record in the
                                database.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <CLModal
                        modalType="search"
                        recordId={userId}
                        routeLink="admin.user.destroy"
                        modalFlip={modalFlip}
                        handleModalState={handleModalState}
                      />

                      <Modal
                        id="flipModal"
                        show={modalPasswordReset}
                        onHide={() => setModalPasswordReset(false)}
                        className="flip"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Reset Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h5 className="fs-16">{`Do you want to reset the user’s password?`}</h5>
                          <p className="text-muted">
                            Resetting the password will generate a new temporary
                            password for this user. The user will need to change
                            it after logging in. Please confirm before
                            proceeding.
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="light"
                            onClick={() => setModalPasswordReset(false)}
                          >
                            {" "}
                            Close{" "}
                          </Button>
                          <Button
                            type="button"
                            onClick={handleModalPasswordReset}
                            variant="primary"
                          >
                            {" "}
                            Send{" "}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>

                  {users?.data?.length !== 0 && (
                    <div className="mt-3 d-flex justify-content-sm-end">
                      <CLPagination pages={pages} />
                    </div>
                  )}
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
Manage.layout = (page: any) => <Layout children={page} />;
export default Manage;
