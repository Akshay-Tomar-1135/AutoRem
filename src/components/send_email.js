import React, { useState } from 'react';
// import { useEffect } from 'react';

const Email = ({_id, appointment, updateUser}) => {
  const [showModal, setShowModal] = useState(false);
  const [msg, setMSG] = useState('');
  const [isLoading, setIsLoading] = useState(false);


//   useEffect(()=>console.log(dateTime), [dateTime])
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sendEmail = async()=>{
    setIsLoading(true);
    const dateTime = new Date(appointment.appointment_date_time);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    await fetch(`http://localhost:8000/send_email/${_id}/${appointment._id}`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          recipientEmail: appointment.client_email,
          subject: 'Appointment Reminder',
          body: {
            name: appointment.client_name,
            intro: "Your appointment is scheduled!",
            table: {
              data: [
                {
                  Description: appointment.appointment_description,
                  Date: date,
                  Time: time,
                }
              ]
            },
            outro: "Looking forward to meet you at scheduled time."
          }
        }),
      })
      .then(res => res.json())
      .then((data)=>{
        if(data.success){
            setMSG(data.message);
            updateUser();
        }
        else{
            setMSG(data.error);
        }
        handleOpenModal();
      })
      setIsLoading(false);
  }
  

  return (
    <>
    {isLoading ? (
        <div className="loading-message-container">
          <div className="loading-message">Loading...</div>
        </div>
      ) : (
    <div>
      {/* Button to open the modal */}
      <button
        type="button"
        className='btn btn-primary btn-block gradient-custom-2 p-2' style={{ width: 'fit-content', fontSize:'15px', fontWeight:'bold' }}
        onClick={sendEmail}
      >
        Send Mail To Client
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header gradient-custom-2">
                {/* <h4 className="modal-title" style={{color:'white'}}>{`${isEdit?'Edit Appointment':'Add an Appointment'}`}</h4> */}
                <button type="button" className="btn btn-close btn-close-white" aria-label='Close' onClick={handleCloseModal}>
                  {/* <span aria-hidden='true'>&times;</span> */}
                </button>
              </div>
                <div className="modal-body">
                  <h3>{msg}</h3>
              </div>
              <div className="modal-footer bg-secondary-subtle">
                <button type="button" className="btn btn-outline-danger" style={{width:'fit-content', fontWeight:'bold'}} onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>}
    </div>
      )}
    </>
  );
};

export default Email;
