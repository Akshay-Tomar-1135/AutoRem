import React, { useEffect, useState } from 'react';
import {MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import './css/home.css';
import EditProfile from './editProfile';

const Profile = ({detail, data, updateUser}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  const tonight = new Date().setHours(23, 59, 59, 999);
  const todaysapp = data.appointments.filter(appointment => {
    return new Date(new Date(appointment.appointment_date_time).toISOString().slice(0,16)).getTime() < tonight;
  });
  const todaysAppointments = todaysapp.length;
  
  useEffect(()=>{
    setIsLoading(true);
    try{
      const pic = require(`../../backend/images/${detail._id}.png`);
      setPhoto(pic);
    }
    catch(err){
      console.log("image hasn't been uploaded yet");
    }
    setIsLoading(false);

  }, [data]);

  return (
    <>
    {isLoading?(
      <div className="loading-message-container">
        <div className="loading-message">Loading...</div>
      </div>
      ):
          (<MDBCard>
            <div className="rounded-top text-white d-flex flex-row" style={{ background: 'linear-gradient(to right, #08afc9, #3641d8, #3660dd, #7a3dd0)', height: '200px'}}>
              <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                <img src={photo?photo:'https://source.unsplash.com/random/300x300'} onClick={()=> {if(photo) window.open(`http://localhost:8000/images/${detail._id}.png`);}}
                  alt="Profile Photo" className="mt-4 mb-2 img-thumbnail" style={{ width: '150px', height:'200px', zIndex: '1', objectFit:'contain'}} />
                <EditProfile 
                id = {detail._id}
                userFname={detail.fname} 
                userLname={detail.lname} 
                userEmail={detail.email}
                userContact={data.contact}
                userLocation={data.location}
                setLoading={setIsLoading}
                updateUser={updateUser}
                />
              </div>
              <div className="ms-3" style={{ marginTop: '130px' }}>
                <MDBTypography tag="h5">{`${detail.fname} ${detail.lname}`}</MDBTypography>
                <MDBCardText>{data.location}</MDBCardText>
              </div>
            </div>
            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="d-flex justify-content-end text-center py-1">
              <MDBCardText className="large text-muted mb-0">Appointments :</MDBCardText>
                <div className="px-3">
                  <MDBCardText className="mb-1 h5">{todaysAppointments}</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Today</MDBCardText>
                </div>
                <div>
                  <MDBCardText className="mb-1 h5">{data.appointments.length}</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Total</MDBCardText>
                </div>
                {/* <div>
                  <MDBCardText className="mb-1 h5">478</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                </div> */}
              </div>
            </div>
            <MDBCardBody className="text-black p-4">
              <div className="mb-5">
                <p className="lead fw-normal mb-1">About</p>
                <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <MDBCardText className="font-italic mb-1"><strong>Email:</strong> {detail.email}</MDBCardText>
                  {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText> */}
                  <MDBCardText className="font-italic mb-0"><strong>Contact:</strong> {data.contact}</MDBCardText>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
    )}</>
  );
}

export default Profile;
