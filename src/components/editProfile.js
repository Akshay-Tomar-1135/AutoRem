import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react';

const EditProfile = ({id, userFname, userLname, userEmail, userContact, userLocation, setLoading, updateUser}) => {
  const [showModal, setShowModal] = useState(false);
  const [isFileSelect, setIsFileSelect] = useState(false);
  const [fname, setFname] = useState(userFname);
  const [lname, setLname] = useState(userLname);
  const [email, setEmail] = useState(userEmail);
  const [contact, setContact] = useState(userContact);
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(userLocation);
  const [error, setError] = useState('');
  // useEffect(()=>{console.log(name, email, contact, appdesc, dateTime, location)}, [dateTime]);
  useEffect(()=>{
    setFname(userFname);
    setLname(userLname);
    setEmail(userEmail);
    setContact(userContact);
    setLocation(userLocation);
  }, [showModal]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setIsFileSelect(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if(isFileSelect){
      const imageData = new FormData();
      imageData.append('id', id);
      imageData.append('file', file);
      fetch('http://localhost:8000/upload', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   Accept: "application/json",
        //   "Access-Control-Allow-Origin": "*" 
        // },
        body: imageData,
      })
      .then((res) => res.json())
      .then((data)=>{
        console.log(data);
      });
    }
    fetch(`http://localhost:8000/update_user`, {
      method:"PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body:JSON.stringify({
        id:id,
        fname:fname,
        lname:lname,
        email:email,
        location:location,
        contact:contact,
      })
    })
    .then((res)=>res.json())
    .then((data) =>{
      if(data.success){
        updateUser();
        handleCloseModal();
        console.log(data.message);
      }
      else{
        setError(data.message);
        console.log(data);
      }
      // setLoading(false);
    });
      
  };

  return (
    <div  style={{zIndex:'2', height: '36px', overflow: 'visible'
    }} >
      {/* Button to open the modal */}
      <button className='btn btn-outline-primary gradient-custom-2' 
      style={{width:'100%', color:'white'}} 
      onClick={handleOpenModal}>
        Edit profile
      </button>

      {/* Modal */}

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header gradient-custom-2">
                <h4 className="modal-title" style={{color:'white'}}>Edit Profile</h4>
                <button type="button" className="btn btn-close btn-close-white" aria-label='Close' onClick={handleCloseModal}>
                  {/* <span aria-hidden='true'>&times;</span> */}
                </button>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="modal-body">
                  <div className=' form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="fname">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      className="form-control"
                      placeholder="Enter your first Name"
                      onChange={(e) => setFname(e.target.value)}
                      value={fname}
                      required
                    />
                  </div>
                  <div className=' form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="lname">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lname"
                      className="form-control"
                      placeholder="Enter your last Name"
                      onChange={(e) => setLname(e.target.value)}
                      value={lname}
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
                      placeholder="Email address (Can't be changed)"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      disabled
                    />
                  </div>
                  <div className=' form-group mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}}htmlFor="contact">
                      Contact
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      className="form-control"
                      placeholder="Enter your contact Number"
                      onChange={(e) => setContact(e.target.value)}
                      value={contact}
                    />
                  </div>
                  <div className='form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Enter your contact"
                      onChange={(e) => setLocation(e.target.value)}
                      value={location}
                    />
                  </div>
                  <div className=' form-check-inline mb-4'>
                    <label className="form-label" style={{color:'#3641d8', fontWeight:'bold'}} htmlFor="photo">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      id="photo"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {setFile(e.target.files[0]); setIsFileSelect(true);}}
                      // value={file}
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
                  Save Changes
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

export default EditProfile;
