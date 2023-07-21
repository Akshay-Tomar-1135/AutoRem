import React, { Component, useState } from 'react';
// import {
//   CDBModal,
//   CDBCardBody,
//   CDBCard,
//   CDBBtn,
//   CDBContainer,
// } from 'cdbreact';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './css/home.css';
class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            modal1:true
        }
    }
  toggle = nr => () =>{
    let modalNumber = 'modal' + nr;
    this.setState({
      ...this.state,
      [modalNumber]: !this.state[modalNumber],
    });
  };
  render(){
      return (
        // <CDBContainer>
        //   <CDBBtn onClick={this.toggle(1)} color="dark">
        //     Modal
        //   </CDBBtn>
        //   <CDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} centered fade>
        //     <CDBCard>
        //       <img className="card-img-top  " src="img/modal.jpg" />
        //       <CDBCardBody>
        //         <h5 className='card-title'>Title</h5>
        //         <p className='card-text'>
        //           Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla orcane faucibus ex, non
        //           facilisis nisl. Maexenas aliquet mauris ut tempus.
        //         </p>
        //         <div className="d-flex">
        //           <div className="d-flex justify-content-start" style={{ flex: ' 50%' }}>
        //             <CDBBtn color="light" flat>
        //               Label
        //             </CDBBtn>
        //           </div>
        //           <div className="d-flex justify-content-end" style={{ flex: ' 50%' }}>
        //             <CDBBtn color="white" flat onClick={this.toggle(1)}>
        //               Cancel
        //             </CDBBtn>
        //             <CDBBtn color="dark" flat>
        //               Done
        //             </CDBBtn>
        //           </div>
        //         </div>
        //       </CDBCardBody>
        //     </CDBCard>
        //   </CDBModal>
        // </CDBContainer>
        // <MDBContainer className='m-3 mx-0' style={{ border:'2px solid black'}} >
            // <MDBRow /*style={{ height:'100vh', overflow:'scroll initial'}}*/>
                // <div className='profile-container' style={{width:'500px'}}>
                    <MDBCard>
                    <div className="rounded-top text-white d-flex flex-row" style={{ background: 'linear-gradient(to right, #08afc9, #3641d8, #3660dd, #7a3dd0)', height: '200px'}}>
                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                        <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                            Edit profile
                        </MDBBtn>
                        </div>
                        <div className="ms-3" style={{ marginTop: '130px' }}>
                        <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
                        <MDBCardText>New York</MDBCardText>
                        </div>
                    </div>
                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <div>
                            <MDBCardText className="mb-1 h5">253</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                        </div>
                        <div className="px-3">
                            <MDBCardText className="mb-1 h5">1026</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                        </div>
                        <div>
                            <MDBCardText className="mb-1 h5">478</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                        </div>
                        </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                            <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                            <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                        <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                        </div>
                        <MDBRow>
                        <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                            alt="image 1" className="w-100 rounded-3" />
                        </MDBCol>
                        <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                            alt="image 1" className="w-100 rounded-3" />
                        </MDBCol>
                        </MDBRow>
                        <MDBRow className="g-2">
                        <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt="image 1" className="w-100 rounded-3" />
                        </MDBCol>
                        <MDBCol className="mb-2">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt="image 1" className="w-100 rounded-3" />
                        </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                    </MDBCard>
                // </div>
            // </MDBRow>
        // </MDBContainer>
      );
  }
};
export default Profile;