import React from 'react';
import './css/home.css';
import './css/loading.css';
import AddClient from './add_apoinment';
import Email from './send_email';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';

const WideCard = ({ _id, appId, clientName, clientContact, clientEmail, clientLocation, appointmentDescription, appointmentTime, eTime, updateUser}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [emailDate, setEmailDate] = useState('');
  const [emailTime, setEmailTime] = useState('');
  const [no, setNo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    const dateTime = new Date(appointmentTime);
    console.log(eTime);
    const emailDateTime = new Date(eTime);
    const eDateTime = new Date(emailDateTime.getTime());// - (emailDateTime.getTimezoneOffset()*60*1000));
    if(emailDateTime.getTime()===0) setNo(true);
    else {
      console.log(emailDateTime, new Date());
      setNo(false);
    }
    setDate(dateTime.toLocaleDateString());
    setTime(dateTime.toLocaleTimeString());
    setEmailDate(eDateTime.toLocaleDateString());
    setEmailTime(eDateTime.toLocaleTimeString());
  }, [eTime, appointmentTime]);

  const handleDelete = ()=>{
    setIsLoading(true);
    fetch('http://localhost:8000/delete_appointments', {
      method: "DELETE",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Specify content type
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        userId: _id,
        appointmentIds:[appId]
      },
    )})
    .then((res)=> res.json())
    .then((data)=>{
      if(data.success){
        updateUser();
      }
      else{
        console.log(data.error);
      }
    })
    .catch((err)=> console.error(err));
    setIsLoading(false);
  }

  return (
    <>
    {isLoading ? (
      <div className="loading-message-container">
        <div className="loading-message">Loading...</div>
      </div>
    ) : (
    <div className="card m-2">
        <div className='d-flex card-header align-items-center justify-content-sm-between'
        style={{color:'#3641d8'}}>
          <div className='d-flex flex-column'>
            <h4>{clientName}</h4>
            {clientLocation}
          </div>
              <div className='d-flex justify-content-sm-between' style={{width:'250px'}}>
              <button
                type="button"
                className='btn btn-primary btn-block gradient-custom-2' style={{ width: '100px', right: '0', fontWeight: 'bold' }}
                onClick={handleDelete}
              >
                Delete
              </button>
              <AddClient 
              _id={_id}
              appId={appId}
              clientName= {clientName} 
              clientEmail={clientEmail} 
              clientContact={clientContact} 
              clientLocation={clientLocation}
              appointmentDesc={appointmentDescription}
              dateAndTime={appointmentTime}
              isEdit={true}
              updateUser={updateUser} />
              </div>
        </div>
    <div className="card-body">
      <div className='d-flex justify-content-sm-between'>
        {/* <div className='d-flex flex-column'> */}
          <h5 className="card-title w-75" /*style={{border:'1px solid black'}}*/>{appointmentDescription}</h5>
        {/* </div> */}
        <p>{date} <br></br>{time}</p>
      </div>
          <p><strong>Last Email Sent: </strong>{no?'Not sent':`${emailDate}, ${emailTime}`}</p>
    </div>
    <div className='card-footer nav flex-row'>
      <div className='d-flex justify-content-sm-between w-100' /*style={{border:'1px solid black'}}*/>
          <li className='nav-item'>
          <strong>Contact:</strong> {clientContact}
          </li>
          <li className='nav-item'>
            <div className='d-flex flex-column justify-content-center align-items-lg-center' >
              <div className='d-flex justify-content-sm-evenly mb-2'>
                <strong className='mx-1'>Email:</strong> {clientEmail}
              </div>
              <Email _id={_id}
              appointment={{
                _id: appId,
                client_name: clientName,
                client_email: clientEmail,
                appointment_description: appointmentDescription,
                appointment_date_time: appointmentTime
              }}
              updateUser={updateUser}/>
            </div>
          </li>
      </div>
    </div>
  </div>
    )}</>
  );
};

export default WideCard;