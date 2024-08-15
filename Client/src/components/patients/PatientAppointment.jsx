import React, { useEffect, useRef, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';
const locales = {
    'en-US': enUS,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
 
const PatientAppoinment = () => {
  const [events,setEvents]= useState([])
  const {user}= useSelector(state=>state.authReducers)
  const [clickSlot,setClickSlot]=useState(null)

  const fetchAllSlots = (doctorId) => {
    fetch(`${BASE_URL}/patient/all-slots`, {
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
                    item["title"] = "Dr."+item.openedBy?.name;
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
  useEffect(()=>{
    fetchAllSlots();
  },[])

  const popupRef = useRef();
  const handleBookSlots = (data) => {
    // update the state in the clickedslot state
    setClickSlot(data);
    //open the opoup and read the data
    popupRef.current.click();
    };
    const closeRef = useRef()
    const navigate = useNavigate()

    const startVC = (roomId)=>{
        // close popup
        closeRef.current.click()
       
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
    
  return (
    <div>
        <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={events}
        onSelectEvent={handleBookSlots}
        style={{ height: 500, margin: '50px' }}
      />
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
                                   Appointment Details
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>These are details of your appointment</p>
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
                            <button                  
                                disabled={isSameDateAndLaterTime(clickSlot?.start)!=true}
                                onClick={()=>startVC(clickSlot?.roomId)}
                                className="btn btn-primary m-3">
                                Join Meet
                            </button>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    ref={closeRef}
                                >
                                    Close
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     
    </div>
  )
}

export default PatientAppoinment