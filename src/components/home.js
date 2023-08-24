import React, { useEffect, useState } from 'react';
import {
  CDBBtn,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { useNavigate, useParams } from 'react-router-dom';
import './css/home.css';
import './css/loading.css'
import logo from './images/autorem logo.png';
import Profile from './profile';
import WideCard from './client_card';
import AddClient from './add_apoinment';

const Home = () => {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  // const [user_id, setUserId] = useState(undefined);
  const user_id = useParams().id;

  /* Auth function to validate jwtoken
  const checkAuth = async()=>{
      await fetch('http://localhost:8000/auth_user', {
        method:'GET',
        credentials:"include",
        headers:{
          Accept: "application/json",
          // "content-Type":"application/json", 
          // "Access-Control-Allow-Origin": "*"
        },
      }).then((res)=>res.json())
      .then(data =>{
        if(data.success){
          console.log('user has been set');
          setUserId(data.userId);
        }
        else{
          navigate('/');
        }
      })
    .catch((err)=>{
      console.log(err);
      navigate('/');
    });
  };
  */
  
  useEffect(() => {
    // checkAuth();
    if (user_id) {
      getUser();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, (500));
    // const interval = setInterval(() => checkAppointments(), 60000);
    // return ()=>clearInterval(interval);
  }, []);

  const getUser = async () => {
    await fetch(`http://localhost:8000/getuser/${user_id}`, {
      method: "GET",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          data.userData.appointments.sort((a, b) => {
            const dateA = new Date(a.appointment_date_time).getTime();
            const dateB = new Date(b.appointment_date_time).getTime();

            return dateA - dateB;
          });
          updateData(data.userData);
          updateDetail(data.user);
          // console.log(userData, userDetail);
        }
        else {
          console.log(data);
        }
      });
    // setTimeout(()=> setTodayApp(todaysAppointments()), 5000);
  }

  const updateData = (data) => {
    setUserData(data);
  }

  const updateDetail = (detail) => {
    setUserDetail(detail);
  }

  // Function to check and process the appointments
  // const checkAppointments = async () => {
  //   getUser();
  //   console.log(userData);
  //   console.log('checkAppointments called');
  //   // Assuming appointmentsArray is your array of appointments
  //   const currentDate = new Date();
  //   const offset = currentDate.getTimezoneOffset();
  //   const currentTime = currentDate.getTime() - (offset * 60 * 1000);

  //   const sortedAppointments = userData.appointments.filter(appointment => {
  //     const appointmentTime = new Date(appointment.appointment_date_time);
  //     const timeDifference = appointmentTime - currentTime; // Difference in milliseconds

  //     // Filter appointments that are less than 30 minutes from the current time
  //     return timeDifference < 1800000;
  //   });
  //   let toDelete = [];
  //   let toUpdate = [];
  //   sortedAppointments.forEach((appointment) => {
  //     const date = new Date(appointment.appointment_date_time);
  //     const time = date.getTime();
  //     console.log(time, currentTime);
  //     if (time < currentTime) {
  //       console.log(appointment.client_name, 'finished');
  //       toDelete.push(appointment._id);
  //     }
  //     else if (appointment.email_sent < 1) {
  //       appointment['email_sent']++;
  //       console.log('send email to ', appointment.client_name, appointment);
  //       toUpdate.push(appointment);
  //     }
  //   })

  //   let isUpdate = false;

  //   if (toDelete.length > 0) {
  //     isUpdate = true;
  //     await fetch('http://localhost:8000/delete_appointments', {
  //       method: "DELETE",
  //       crossDomain: true,
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json", // Specify content type
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //       body: JSON.stringify({
  //         userId: userData._id,
  //         appointmentIds: toDelete
  //       },
  //       )
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           // updateData(data.updateUser);
  //           // getUser();
  //           console.log('finished appointments deleted')
  //         }
  //       })
  //       .catch((err) => console.error(err));
  //   }

  //   toUpdate.forEach(async (item) => {
  //     isUpdate = true;
  //     console.log('sending mail to', item.client_name);
  //     const dateTime = new Date(new Date(item.appointment_date_time).toISOString().slice(0, 16));
  //     const date = dateTime.toLocaleDateString();
  //     const time = dateTime.toLocaleTimeString();
  //     const res = await fetch('http://localhost:8000/send_email', {
  //       method: 'POST',
  //       crossDomain: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //       body: JSON.stringify({
  //         recipientEmail: item.client_email,
  //         subject: 'Appointment Reminder',
  //         body: {
  //           name: item.client_name,
  //           intro: "Your appointment is scheduled!",
  //           table: {
  //             data: [
  //               {
  //                 Description: item.appointment_description,
  //                 Date: date,
  //                 Time: time,
  //               }
  //             ]
  //           },
  //           outro: "Looking forward to meet you at scheduled time."
  //         }
  //       }),
  //     })
  //     if (res.success) {
  //       console.log(res.message);
  //       fetch(`http://localhost:8000/update_appointments/${userData._id}/${item._id}`, {
  //         method: 'PUT',
  //         crossDomain: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           "Access-Control-Allow-Origin": "*"
  //         },
  //         body: JSON.stringify({
  //           name: item.client_name,
  //           email: item.client_email,
  //           contact: item.client_contact,
  //           appdesc: item.appointment_description,
  //           dateTime: new Date(item.appointment_date_time).toISOString().slice(0, 16),
  //           location: item.client_location,
  //           email_sent: item.email_sent
  //         }),
  //       }).then((res) => res.json())
  //         .then((data) => {
  //           if (data.success) {
  //             console.log(data.userDetail);
  //             setUserData(data.userDetail);
  //           }
  //           else {
  //             console.log(data);
  //           }
  //         });
  //     }
  //   });
  //   if(isUpdate) getUser();
  // };



  return (
    <>
      {isLoading ? (
        <div className="loading-message-container">
          <div className="loading-message">Loading...</div>
        </div>
      ) : (
        <div className='d-flex' style={{ height: '100vh', width: 'auto', border: 'solid 1px black' }}>
          <div
            className='m-2 ml-3'
            style={{ position: 'relative', boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}
          >
            <CDBSidebar textColor="rgb(68, 114, 231)" backgroundColor='white' maxWidth='250px' minWidth='60px'
              style={{ borderRadius: '10px' }} toggled={true}
            >
              <CDBSidebarHeader prefix={<i><img
                // className='sidebar-prefix'
                src={logo}
                alt="logo"
                style={{ width: '60px' }}
              /></i>}>
                <h3 className='mb-0 my-3' style={{ color: '#3641d8' }}>AutoRem</h3>
              </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                  <CDBSidebarMenuItem
                    className='menu-item mx-1'
                    icon="user"
                    onClick={() => setShowProfile(!showProfile)}

                  >
                    Profile page
                  </CDBSidebarMenuItem>
                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                  className='menu-item mx-1 mb-3'
                  style={{
                    padding: '10px 5px',
                    cursor:'pointer', fontWeight:'bold'
                  }}
                  onClick={()=>navigate('/')}
                >
                  Log out
                </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>
          <div className='hideScrollBar' style={{ overflow: 'scroll' }}>
            <div className={`open-close ${showProfile ? 'open m-2' : 'close'}`} style={{ boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
              <Profile
                detail={userDetail}
                data={userData}
                updateUser={getUser} />
            </div>
          </div>
          <div className='d-flex flex-column flex-grow-1 m-2' style={{ minWidth: '600px', boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
            <div className='d-flex justify-content-sm-between mt-5 mx-5'>
              <h2 style={{ color: '#3641d8' }}>{`Welcome ${userDetail ? userDetail.fname : 'Anonymous User'}`}</h2>
              {/* <button className='btn btn-primary btn-block gradient-custom-2' style={{ width: '100px', right: '0', fontWeight: 'bold' }}>
            + Add
          </button> */}
              <AddClient _id={userData._id} updateUser={getUser} />
            </div>
            <div className='m-3' style={{ minWidth: '500px', border: '1px solid rgb(68, 114, 231)' }}></div>
            <div className='hideScrollBar flex-grow-1 m-4' style={{ maxHeight: '100%', overflow: 'scroll' }}>
              {userData.appointments.length ? (
                <>
                  {userData.appointments.map((item, index) => (
                    <WideCard
                      key={index}
                      _id={userData._id}
                      appId={item._id}
                      clientName={item.client_name}
                      clientContact={item.client_contact}
                      clientEmail={item.client_email}
                      clientLocation={item.client_location}
                      appointmentDescription={item.appointment_description}
                      appointmentTime={new Date(item.appointment_date_time).toISOString().slice(0, 16)}
                      eTime={item.email_sent}
                      updateUser={getUser}
                    />))
                  }
                </>
              ) :
                (
                  <div className='d-flex justify-content-center' style={{ fontSize: '50px', opacity: '0.5' }}>
                    No Appointments
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
