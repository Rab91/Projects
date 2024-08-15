import React, { useEffect, useRef, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
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

const DoctorAppoinment = () => {
    const [events, setEvents] = useState([]);
    const buttonRef = useRef();
    const [clickSlot, setClickSlot] = useState(null);
    const { user } = useSelector((state) => state.authReducers);

    const OpenSlotAPI = () => {
        fetch(`${BASE_URL}/doctor/open-slot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: user?.token,
            },
            body: JSON.stringify({
                start: clickSlot.start,
                end: clickSlot.end,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                CloseButtonRef.current.click();
                if (data.sucess) {
                    toast.success("Slot opened sucessfully");
                    fetchAllSlots();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };
    const openSlot = (data) => {
        setClickSlot(data);
        buttonRef.current.click();
    };

    const fetchAllSlots = () => {
        fetch(`${BASE_URL}/doctor/all-slots`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: user?.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let temp = [];
                for (let item of data.slots) {
                    item["title"] = item.isBooked
                        ? item?.bookedBy?.name
                        : "Available";
                    item["allDay"] = false;
                    item["start"] = new Date(item["start"]);
                    item["end"] = new Date(item["end"]);

                    temp.push(item);
                }
                setEvents(temp);
            })
            .catch((err) => toast.error(err.message));
    };
    const CloseButtonRef = useRef();
    useEffect(() => {
        fetchAllSlots();
    }, []);
    console.log(events);

    const [currentSelectedEvent, setCurrentSelectedEvent] = useState(null);
    //new references for new popup
    const newButtonRef = useRef();
    const newCloseRef = useRef();

    const getEventDetails = (data) => {
        console.log(data);
        //update the current selected event
        setCurrentSelectedEvent(data);
        //open the new popup that read the state
        newButtonRef.current.click();
    };
    const navigate = useNavigate()

    const startVC = (roomId)=>{
        // close popup
        newCloseRef.current.click()
        
        navigate(`/video-call/${roomId}`)
    }
    function isSameDateAndLaterTime(givenDate) {
        const now = new Date();
    
        // Check if the year, month, and date are the same
        const isSameDate =
          now?.getFullYear() === givenDate?.getFullYear() &&
          now?.getMonth() === givenDate?.getMonth() &&
          now?.getDate() === givenDate?.getDate();
    
        // Check if the current time is later than the given time
        const isLaterTime = now?.getTime() > givenDate?.getTime();
    
        // Return true only if both conditions are met
        return isSameDate && isLaterTime;
      }
    
    const deleteSlot = () => {
        fetch(
            `${BASE_URL}/doctor/delete-slot/${currentSelectedEvent._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user?.token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.sucess) {
                    newCloseRef.current.click();
                    toast.success("Slot Deleted");
                    fetchAllSlots();
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={openSlot}
                selectable={true}
                eventPropGetter={(event) => {
                    const backgroundColor = event.isBooked ? "red" : "green";
                    return { style: { backgroundColor } };
                }}
                onSelectEvent={getEventDetails}
                style={{ height: 500, margin: "50px" }}
            />
            {/* this is the popup that will open if you click on any empty slot over caldernder*/}

            <div>
                <button
                    style={{ display: "none" }}
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    ref={buttonRef}
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
                                    Add Slot Details
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>Please verify the slot details</p>
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
                                    onClick={OpenSlotAPI}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Open Slot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is the popup that will open if you click on any present event over caldernder*/}
            <div>
                <button
                    style={{ display: "none" }}
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#newpopup"
                    ref={newButtonRef}
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="newpopup"
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
                                    Your slot details
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>Following your slot details</p>
                                <div className="d-flex justify-content-between">
                                    <p>
                                        <b>Start Date:</b>{" "}
                                        {currentSelectedEvent?.start.toDateString()}
                                    </p>
                                    <p>
                                        <b>Start Time: </b>
                                        {currentSelectedEvent?.start.toLocaleTimeString()}
                                    </p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p>
                                        <b>End Date:</b>{" "}
                                        {currentSelectedEvent?.end.toDateString()}
                                    </p>
                                    <p>
                                        <b>End Time: </b>
                                        {currentSelectedEvent?.end.toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <img
                                            className="rounded-circle m-1"
                                            width={50}
                                            src={
                                                currentSelectedEvent?.bookedBy
                                                    ?.profilePic
                                            }
                                        />
                                    </div>
                                    <div className="flex-column">
                                        <h5>
                                            {
                                                currentSelectedEvent?.bookedBy
                                                    ?.name
                                            }
                                        </h5>

                                        <div className="d-flex">
                                            <FontAwesomeIcon
                                                className="p-1 text-color"
                                                icon={faEnvelope}
                                            />
                                            <p>
                                                {
                                                    currentSelectedEvent
                                                        ?.bookedBy?.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                    disabled={isSameDateAndLaterTime(currentSelectedEvent?.start)!=true}
                                    onClick={()=>startVC(currentSelectedEvent?.roomId)}
                                    className="btn btn-primary m-3">
                                        Start Meet
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={newCloseRef}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={deleteSlot}
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Delete Slot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAppoinment;
