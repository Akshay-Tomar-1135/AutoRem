import React, { useState } from 'react';
import { useEffect } from 'react';

const AddClient = ({_id, appId, clientName, clientEmail, clientContact, clientLocation, appointmentDesc, dateAndTime, isEdit = false, updateUser}) => {
  const [showModal, setShowModal] = useState(false);
  // const [isEdit, setIsEdit] = useState(edit);
  const [name, setName] = useState(clientName);
  const [email, setEmail] = useState(clientEmail);
  const [contact, setContact] = useState(clientContact);
  const [appdesc, setDesc] = useState(appointmentDesc);
  const [dateTime, setDateTime] = useState(dateAndTime);
  const [location, setLocation] = useState(clientLocation);
  const [error, setError] = useState('');

  useEffect(()=>{
    if(isEdit){
      setName(clientName);
      setEmail(clientEmail);
      setContact(clientContact);
      setDesc(appointmentDesc);
      setDateTime(dateAndTime);
      setLocation(clientLocation);
    }
  }, [showModal]);

  useEffect(()=>console.log(dateTime), [dateTime])
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(_id, appId, name, email, contact, appdesc, dateTime, location);

    // if(isEdit){
      fetch(`http://localhost:8000/${isEdit?`update_appointments/${_id}/${appId}`:`add_appointments/${_id}`}`,{
        method:`${isEdit?'PUT':'POST'}`,
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          contact:contact,
          appdesc:appdesc,
          dateTime:dateTime,
          location:location,
          // email_sent: 0
        }),
      }).then((res)=>res.json())
      .then((data) =>{
        if(data.success){
          // updateUser(data.data);
          updateUser();
          handleCloseModal();
        }
        else{
          setError(data.error);
          console.log(data);
        }
      });
  }

  return (
    <div>
      {/* Button to open the modal */}
      <button
        type="button"
        className='btn btn-primary btn-block gradient-custom-2' style={{ width: '100px', right: '0', fontWeight: 'bold' }}
        onClick={handleOpenModal}
      >
        {`${isEdit?'Edit':'+ Add'}`}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header gradient-custom-2">
                <h4 className="modal-title" style={{color:'white'}}>{`${isEdit?'Edit Appointment':'Add an Appointment'}`}</h4>
                <button type="button" className="btn btn-close btn-close-white" aria-label='Close' onClick={handleCloseModal}>
                  {/* <span aria-hidden='true'>&times;</span> */}
                </button>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="modal-body">
                  <div className=' form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Client's Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
                  <div className=' form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Client's City / Village"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    />
                  </div>
                  <div className=' form-group mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Client's Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className=' form-group mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="contact">
                      Contact
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      className="form-control"
                      placeholder="Client's Contact Number"
                      onChange={(e) => setContact(e.target.value)}
                      value={contact}
                    />
                  </div>
                  <div className=' form-group mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="datetime">
                      Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      id="datetime"
                      className="form-control"
                      // placeholder="Appointment Description"
                      onChange={(e) => setDateTime(e.target.value)}
                      value={dateTime}
                      required
                    />
                  </div>
                  <div className=' form-group mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      placeholder="Appointment Description"
                      onChange={(e) => setDesc(e.target.value)}
                      value={appdesc}
                      required
                    />
                  </div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
              </div>
              <div className="modal-footer bg-secondary-subtle">
                <button type="button" className="btn btn-outline-danger" style={{width:'fit-content', fontWeight:'bold'}} onClick={handleCloseModal}>
                  Close
                </button>
                <button type="submit" className='btn btn-outline-primary btn-block' 
                style={{width:'fit-content', fontWeight:'bold'}} >
                  {`${isEdit?'Save Changes':'Add'}`}
                </button>
              </div>
                  </form> 
            </div>
          </div>
        </div>
      )}
      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>}
    </div>
  );
};

export default AddClient;
