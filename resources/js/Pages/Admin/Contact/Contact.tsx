import { useState, FormEventHandler, Fragment, useEffect } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";
import CLPagination from "../../../Component/Backend/CLPagination";
import { ContactProps } from "../../../type/contactProps";
import { siteBaseUrl } from "../../../type/globalData";
import CLModal from "../../../Component/Backend/CLModal";
import "../../../css/customStyle.css";
import "../User/User.css";
import timeCalculate from "../../../helper/timeCalculate";

function Contact({ contacts, pages = [] }: ContactProps) {
  const [modalFlip, setModalFlip] = useState<boolean>(false);
  const [contactId, setContactId] = useState<number>(0);

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
      get(route("admin.contact.index", { page: 1, search: data.search }), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const handleModalState = (data: string) => {
    if (data === "2") {
      setContactId(0);
      setModalFlip(false);
    } else {
      setModalFlip(false);
    }
  };

  const handleResetTable = () => {
    if (data.search.length !== 0) {
      setData({ search: "" });
      router.visit(`${siteBaseUrl}/contact`, {
        method: "get",
      });
    }
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

  const handleUserView = (contactId: number) => {
    router.visit(route("admin.contact.view", { id: contactId }));
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
            title="Contact"
            pageTitle="Contact Page"
            pageUrl="/auth/console/contact"
            currentPage="Manage"
          />
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header className="align-items-center d-flex">
                  <h4 className="mb-0 card-title flex-grow-1">
                    Contact Manage
                  </h4>
                  <div className="flex-shrink-0">
                    <div className="d-flex justify-content-sm-end">
                      <form onSubmit={submit}>
                        <div className="search-box ms-2 search-box-custom-width ">
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email or phone"
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Service</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts?.data?.length !== 0 &&
                            contacts?.data?.map((item, index) => (
                              <tr key={index}>
                                <td className="fw-medium">
                                  {(contacts.current_page - 1) * 10 + index + 1}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.service_type}</td>
                                <td>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase">
                                    <span>
                                      <i className="mdi mdi-clock-outline"></i>{" "}
                                      {timeCalculate(item.created_at)}
                                    </span>
                                  </p>
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
                                      onClick={() => {
                                        setContactId(item.id);
                                        setModalFlip(!modalFlip);
                                      }}
                                      className="cursor-pointer link-danger fs-15"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}

                          {contacts?.data?.length === 0 && (
                            <tr>
                              <td
                                colSpan={7}
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
                        recordId={contactId}
                        routeLink="admin.contact.destroy"
                        modalFlip={modalFlip}
                        handleModalState={handleModalState}
                      />
                    </div>
                  </div>

                  {contacts?.data?.length !== 0 && (
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
Contact.layout = (page: any) => <Layout children={page} />;
export default Contact;
