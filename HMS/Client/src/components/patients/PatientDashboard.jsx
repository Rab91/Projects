import React from "react";
import "../../App.css";
import UpdateProfile from "../common/updateProfile/updateProfile";
import DoctorsTab from "./DoctorsTab";

const PatientDashboard = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline text-color">
                                    Patient Dashboard
                                </span>
                            </div>
                            <ul
                                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu"
                            >
                                <li className="nav-item">
                                    <a
                                        href="/"
                                        className="nav-link align-middle px-0"
                                    >
                                        <i className="fs-4 bi-house" />{" "}
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Home
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#submenu1"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-speedometer2" />{" "}
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Appointments
                                        </span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-table" />{" "}
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Doctors
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#submenu2"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle "
                                    >
                                        <i className="fs-4 bi-bootstrap" />{" "}
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Chat
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#submenu3"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-grid" />{" "}
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Profile
                                        </span>{" "}
                                    </a>
                                </li>
                            </ul>
                            <hr />
                        </div>
                    </div>

                    <DoctorsTab />
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
