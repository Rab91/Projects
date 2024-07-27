import React from "react";
import "../../App.css";

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
                    
                    <div className="col">
                      <div className="d-flex justify-content-around">
                        <div className="flex-column">
                          <h5 className="text-color">Profile</h5>
                          <h5>Rabia</h5>
                          <h6>rabianuzha@gmail.com</h6>
                          <hr/>
                          <h5 className="text-color">About</h5>
                         <p>Hello, Welcome</p>
                        </div>
                       
                        <div className="flex-column">
                        <h5 className="text-color">Change Password</h5>
                    
                        <div className="form-outline">
                            <label className="form-label">
                                Old Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            />
                        </div>

                        <div className="form-outline">
                            <label className="form-label">
                                New Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            />
                        </div>

                        <div className="form-outline">
                            <label className="form-label">
                                Confirm New Password
                            </label>
                            <input
                            type="password"
                            className="form-control"
                            />
                        </div>

                        <div className="row">
                                <button className="btn btn-primary  m-2">
                                    Change Password
                                </button>
                            </div>
                            
                        </div>
                      </div>

                        <hr />
                        <h5 className="text-color">Personal Details</h5>

                        <p className="lead">
                            <div className="row">
                                <div className="col">
                                    {/* Name input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    {/* Name input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    {/* Email input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h5 className="text-color">Address</h5>

                            <div className="row">
                                <div className="col">
                                    {/* Name input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            Street
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    {/* Email input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    {/* Name input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    {/* Email input */}
                                    <div className="form-outline">
                                        <label className="form-label">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <button className="btn btn-primary w-25 m-2">
                                    Update
                                </button>
                            </div>

                        </p>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
