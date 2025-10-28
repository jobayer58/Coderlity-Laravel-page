import {Fragment} from 'react';
import CountUp from "react-countup";
import { Card, Col } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import { ecomWidgets } from '../../common/data/dashboardEcommerce';

const Widgets = () => {
    return (
        <Fragment>
            {ecomWidgets.map((item: any, key: number) => (
                <Col xl={3} md={6} key={key}>
                    <Card className="card-animate">
                        <Card.Body>
                            <div className="d-flex align-items-center">
                                <div className="overflow-hidden flex-grow-1">
                                    <p className="mb-0 text-uppercase fw-medium text-muted text-truncate">{item.label}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                        {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} %
                                    </h5>
                                </div>
                            </div>
                            <div className="mt-4 d-flex align-items-end justify-content-between">
                                <div>
                                    <h4 className="mb-4 fs-22 fw-semibold ff-secondary"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            prefix={item.prefix}
                                            suffix={item.suffix}
                                            separator={item.separator}
                                            end={item.counter}
                                            decimals={item.decimals}
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link href="#" className="text-decoration-underline">{item.link}</Link>
                                </div>
                                <div className="flex-shrink-0 avatar-sm">
                                    <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor + "-subtle"}>
                                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>))}
        </Fragment>
    );
};

export default Widgets;