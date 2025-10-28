import { Link } from "@inertiajs/react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

interface BreadCrumbProps {
  title: string;
  pageTitle: string;
  pageUrl: string;
  currentPage: string;
}

const CLBreadCrumb = ({
  title,
  pageTitle,
  pageUrl,
  currentPage,
}: BreadCrumbProps) => {
  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">{title}</h4>

            <div className="page-title-right">
              <ol className="m-0 breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={route("dashboard.home")}>
                    <i className="ri-home-5-fill" />
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={pageUrl}>{pageTitle}</Link>
                </li>
                <li className="breadcrumb-item active">{currentPage}</li>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CLBreadCrumb;
