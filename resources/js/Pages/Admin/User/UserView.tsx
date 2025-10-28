import { Fragment } from "react";
import { Card, Col, Container, Button, Row, Table } from "react-bootstrap";
import { Head, router } from "@inertiajs/react";
import Layout from "../../../Layouts";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";
import { UserViewProps } from "../../../type/adminUserProps";
import { country } from "../../../common/data";
import avatar1 from "../../../../images/users/avatar-1.jpg";

import "./User.css";
import { photoUrl } from "../../../type/globalData";

function UserView({ user }: UserViewProps) {
  const dateStyle = new Date(user.created_at);
  const customDate = `${dateStyle.getDate()} ${dateStyle.toLocaleString(
    "en-GB",
    { month: "long" }
  )}, ${dateStyle.getFullYear()}`;

  let phoneStyle =
    user.phone.split(",").length == 2
      ? `(${user.phone.split(",")[0]}) ${user.phone.split(",")[1]}`
      : user.phone;

  const handleBackPage = () => {
    router.visit(route("admin.user.index"));
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
            currentPage="View"
          />
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header className="align-items-center d-flex">
                  <h4 className="mb-0 card-title flex-grow-1">
                    User Information
                  </h4>
                </Card.Header>

                <Card.Body>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="mb-0 align-middle table-bordered table-hover table-striped table-nowrap">
                        <thead>
                          <tr>
                            <th scope="col">Photo</th>
                            <td>
                              <img
                                src={
                                  user.photo == "avatar.png"
                                    ? avatar1
                                    : `${photoUrl}/admin/user/${user.photo}`
                                }
                                alt={user.photo}
                                className="rounded avatar-md material-shadow"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="col">User Name</th>
                            <td>{user.name}</td>
                          </tr>
                          <tr>
                            <th scope="col">Email</th>
                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <th scope="col">Country</th>
                            <td>
                              {country.find(
                                (e) => e.countryName == user.country
                              )?.flagImg && (
                                <img
                                  src={
                                    country.find(
                                      (e) => e.countryName == user.country
                                    )?.flagImg
                                  }
                                  alt="country flag"
                                  className="options-flagimg changebgcolor"
                                  height="20"
                                />
                              )}

                              {user.country}
                            </td>
                          </tr>
                          <tr>
                            <th scope="col">Phone</th>
                            <td>{phoneStyle}</td>
                          </tr>
                          <tr>
                            <th scope="col">Role</th>
                            <td className="text-primary">{user.role}</td>
                          </tr>
                          <tr>
                            <th scope="col">Status</th>
                            <td>
                              {user.status === "Active" ? (
                                <span className="px-2 py-2 badge bg-success-subtle text-success customfontsize">
                                  Active
                                </span>
                              ) : (
                                <span className="px-2 py-2 badge bg-danger-subtle text-danger customfontsize">
                                  Disabled
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th scope="col">Created On</th>
                            <td>{customDate}</td>
                          </tr>
                        </thead>
                      </Table>

                      <Button
                        type="button"
                        onClick={handleBackPage}
                        variant="primary"
                        className="mt-3"
                      >
                        ← Go Back
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}
UserView.layout = (page: any) => <Layout children={page} />;
export default UserView;
