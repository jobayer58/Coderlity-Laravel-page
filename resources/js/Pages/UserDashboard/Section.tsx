import { Col, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";

const Section = ({ rightClickBtn }: any) => {
  return (
    <Row className="pb-1 mb-3">
      <Col xs={12}>
        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
          <div className="flex-grow-1">
            <h4 className="mb-1 fs-16">Good Morning, Anna!</h4>
            <p className="mb-0 text-muted">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="mt-3 mt-lg-0">
            <form action="#">
              <Row className="mb-0 g-3 align-items-center">
                <div className="col-sm-auto">
                  <div className="input-group">
                    <Flatpickr
                      className="border-0 shadow form-control dash-filter-picker minimal-border"
                      options={{
                        mode: "range",
                        dateFormat: "d M, Y",
                        defaultDate: ["01 Jan 2022", "31 Jan 2022"],
                      }}
                    />
                    <div className="text-white input-group-text bg-primary border-primary">
                      <i className="ri-calendar-2-line"></i>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-soft-success material-shadow-none"
                  >
                    <i className="align-middle ri-add-circle-line me-1"></i> Add
                    Product
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn material-shadow-none"
                    onClick={rightClickBtn}
                  >
                    <i className="ri-pulse-line"></i>
                  </button>
                </div>
              </Row>
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Section;
