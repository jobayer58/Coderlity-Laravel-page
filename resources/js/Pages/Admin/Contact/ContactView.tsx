import { Fragment } from "react";
import { Card, Col, Container, Button, Row, Table } from "react-bootstrap";
import { Head, router } from "@inertiajs/react";
import Layout from "../../../Layouts";
import CLBreadCrumb from "../../../Component/Backend/CLBreadCrumb";
import { ContactViewProps } from "../../../type/contactProps";

function ContactView({ contact }: ContactViewProps) {
  const dateStyle = new Date(contact.created_at);
  const customDate = `${dateStyle.getDate()} ${dateStyle.toLocaleString(
    "en-GB",
    { month: "long" }
  )}, ${dateStyle.getFullYear()}`;

  const handleBackPage = () => {
    router.visit(route("admin.contact.index"));
  };

  return (
    <Fragment>
      <Head title="Starter | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <Container fluid>
          <CLBreadCrumb
            title="Contact"
            pageTitle="Contact Page"
            pageUrl="/auth/console/contact"
            currentPage="View"
          />
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header className="align-items-center d-flex">
                  <h4 className="mb-0 card-title flex-grow-1">
                    Contact Information
                  </h4>
                </Card.Header>

                <Card.Body>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="mb-0 align-middle table-bordered table-hover table-striped table-nowrap">
                        <tbody>
                          <tr>
                            <th scope="col">Name</th>
                            <td>{contact.name}</td>
                          </tr>
                          <tr>
                            <th scope="col">Email</th>
                            <td>{contact.email}</td>
                          </tr>

                          <tr>
                            <th scope="col">Phone</th>
                            <td>{contact.phone}</td>
                          </tr>

                          <tr>
                            <th scope="col">Address</th>
                            <td>{contact.address}</td>
                          </tr>

                          <tr>
                            <th scope="col">Service</th>
                            <td>{contact.service_type}</td>
                          </tr>

                          <tr>
                            <th scope="col">Message</th>
                            <td>{contact.message}</td>
                          </tr>

                          <tr>
                            <th scope="col">Created On</th>
                            <td>{customDate}</td>
                          </tr>
                        </tbody>
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
ContactView.layout = (page: any) => <Layout children={page} />;
export default ContactView;
