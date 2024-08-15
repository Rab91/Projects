import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
    getAllDoctorsAction,
    getAllDepartmentsAction,
    filterDoctors,
} from "../../redux/slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../common/userCard/UserCard";
import {toast}from 'react-toastify'

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

import { BASE_URL } from "../../../config";

const DoctorsTab = () => {
    const { doctors, departments, loading, error } = useSelector(
        (state) => state.patientReducers
    );
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.authReducers);
    //fetch all the doctors and departments
    useEffect(() => {
        dispatch(getAllDoctorsAction({ token: user.token }));
        dispatch(getAllDepartmentsAction({ token: user.token }));
    }, []);

    //states to store form data
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("all");

    const handleFilter = (e) => {
        e.preventDefault();
        console.log(name, department);
        dispatch(
            filterDoctors({ name, departmentId: department, token: user.token })
        );
    };
    const [events, setEvents] = useState([]);
    const fetchSlotDoctors = (doctorId) => {
        fetch(`${BASE_URL}/patient/doctor-slots/${doctorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: user?.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    let temp = [];
                    for (let item of data.slots) {
                        item["title"] = item.isBooked ? "Booked" : "Available";
                        item["allDay"] = false;
                        item["start"] = new Date(item["start"]);
                        item["end"] = new Date(item["end"]);

                        temp.push(item);
                    }
                    setEvents(temp);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };
    const [clickSlot, setClickSlot] = useState(null);
    const popupRef = useRef();
    const CloseButtonRef = useRef();

    const handleBookSlots = (data) => {
        // update the state in the clickedslot state
        setClickSlot(data);
        //open the opoup and read the data
        popupRef.current.click();
    };
    const bookSlots = ()=>{
        fetch(`${BASE_URL}/patient/book-slot/${clickSlot._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: user?.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                   toast.success("Slot is booked")
                   CloseButtonRef.current.click()
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    }
    return (
        <div className="mt-3">
            <form onSubmit={handleFilter} className="d-flex mt-2 mb-2 gap-2">
                <div className="form-group">
                    <label>Search by name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.currentTarget.value)}
                        value={name}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Choose department</label>
                    <select
                        onChange={(e) => setDepartment(e.currentTarget.value)}
                        value={department}
                        className="form-select"
                    >
                        <option value="all">All Departments</option>
                        {departments?.map((item, index) => (
                            <option key={index} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group m-1">
                    <button className="btn btn-primary mt-3">
                        Apply Filter
                    </button>
                </div>
                <div className="form-group m-1">
                    <button
                        type="button"
                        onClick={() => {
                            setName("");
                            setDepartment("all");
                            dispatch(
                                getAllDoctorsAction({ token: user.token })
                            );
                        }}
                        className="btn btn-primary mt-3"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <div>
                <div className="row mt-2">
                    <div className="col col-4">
                        {doctors?.length == 0 && (
                            <p className="text-center">No doctors found !</p>
                        )}
                        {doctors?.map((item, index) => (
                            <div key={index} className="col col-4">
                                <UserCard
                                    bio={item.about}
                                    name={item.name}
                                    email={item.email}
                                    address={item?.address}
                                    pic={item.profilePic}
                                    id={item._id}
                                    department={item?.departmentId?.name}
                                    fetchSlotDoctors={fetchSlotDoctors}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="col col-8">
                        <h3>Available slot of doctors</h3>
                        <Calendar
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            events={events}
                            onSelectEvent={handleBookSlots}
                            style={{ height: 300 }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <button
                    style={{ display: "none" }}
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    ref={popupRef}
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Doctor Slot Details
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>Please verify the booking details</p>
                                <div className="d-flex justify-content-between">
                                    <p>
                                        <b>Start Date:</b>{" "}
                                        {clickSlot?.start.toDateString()}
                                    </p>
                                    <p>
                                        <b>Start Time: </b>
                                        {clickSlot?.start.toLocaleTimeString()}
                                    </p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p>
                                        <b>End Date:</b>{" "}
                                        {clickSlot?.end.toDateString()}
                                    </p>
                                    <p>
                                        <b>End Time: </b>
                                        {clickSlot?.end.toLocaleTimeString()}
                                    </p>
                                </div>
                                <hr/>
                                <div className="d-flex">
                                    <div>
                                        <img
                                            className="rounded-circle m-1"
                                            width={50}
                                            src={clickSlot?.openedBy?.profilePic}
                                        />
                                    </div>
                                    <div className="flex-column">
                                    <h5>{clickSlot?.openedBy?.name}</h5>

                                <div className="d-flex">
                                    <FontAwesomeIcon
                                        className="p-1 text-color"
                                        icon={faEnvelope}
                                    />
                                    <p>{clickSlot?.openedBy?.email}</p>
                                </div>

                            </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={CloseButtonRef}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={bookSlots}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Book Slot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorsTab;
