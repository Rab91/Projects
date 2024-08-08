import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({name,email,pic,address,bio,department}) => {
  return (
    <div>
        <div className="row row-cols-1 row-cols-md-3 g-1">
                <div className="col">
                    <div className="card border-primary h-100" style={{width: '18rem'}}>
                        <div className="card-header">{name}</div>
                        <div className="d-flex justify-content-between m-1">
                            <div>
                                <img
                                    className="rounded-circle m-1"
                                    width={50}
                                    src={pic}
                                />
                            </div>
                            <div className="flex-column mt-1">
                                <div className="d-flex">
                                    <FontAwesomeIcon
                                        className="p-1 text-color"
                                        icon={faEnvelope}
                                    />
                                    <p>{email.substr(0,24)}</p>
                                </div>
                                {
                                    address && 
                                    <div className="d-flex">
                                    <FontAwesomeIcon
                                        className="p-1 text-color"
                                        icon={faLocationDot}
                                        />
                                        <p>{address?.state}{address?.city}</p>
                                    </div>
                                }
                                
                            </div>
                        </div>

                        <div className="card-body text-color">
                            <h6 className="card-title">Bio</h6>
                            {
                                bio && <p className="card-text">{bio}</p>
                            }
                          
                            {
                                department && <p className="card-text">Department:{department}</p>
                            }
                            <div className="d-flex gap-1">
                                <a href="#" className="btn btn-primary">
                                    Message
                                </a>
                                <a href="#" className="btn btn-primary">
                                    Appointment
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
    </div>
  )
}

export default UserCard