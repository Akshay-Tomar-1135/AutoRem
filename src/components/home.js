import React, { Component } from 'react';
import {
  CDBBtn,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './css/home.css'
import logo from './images/autorem logo.png'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

import Profile from './profile';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
          showProfile:false
        }
    }
    render(){
        return (
          <div
            className='d-flex'
        style={{  height: '98vh', width:'auto', border: 'solid 1px black'
      }}
          > 
            <div className='m-2 ml-3' style={{position:'relative', boxShadow:'2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px'}}>
              <CDBSidebar textColor="rgb(68, 114, 231)" backgroundColor='white' maxWidth='250px' minWidth='60px'
                style={{borderRadius:'10px'}} toggled='true '
              >
                  <CDBSidebarHeader prefix={<i><img
                      className='sidebar-prefix' 
                      src={logo}
                      alt="logo"
                      style={{ width: '60px' }}
                      /></i>}>
                  {/* <div style={{ display: 'flex', alignItems: 'right' }}> */}
                      <h4 className=' mb-0 my-3'>AutoRem</h4>
                  {/* </div> */}
                  </CDBSidebarHeader>
        
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <CDBSidebarMenuItem 
                      className='menu-item mx-1' 
                      icon="user"
                      onClick={()=>this.setState({showProfile:!this.state.showProfile})}>
                        Profile page
                    </CDBSidebarMenuItem>
                  </CDBSidebarMenu>
                </CDBSidebarContent>
        
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      padding: '20px 5px',
                    }}
                  >
                    Sidebar Footer
                  </div>
                </CDBSidebarFooter>
              </CDBSidebar>
            </div>
            <div className='hideScrollBar' style={{overflow:'scroll'}}>
              <div className={`open-close ${this.state.showProfile?'open m-2':'close'}`}
                style={{boxShadow:'2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px'}}>
              {/* {this.state.showProfile?(<div className='profile-open'><Profile /></div>):(<div className='profile-close'></div>)} */}
            <Profile />
            </div>
            </div>
            <div className='hideScrollBar overflow-scroll flex-grow-1 m-2' style={{boxShadow:'2px 0px 8px rgba(0, 0, 0, 0.7)', borderRadius: '10px'}}>
              <div className='d-flex justify-content-end mt-5 mx-5' /*style={{ border:'4px solid rgb(68, 114, 231)'}}*/>
                <button className='btn btn-primary btn-block gradient-custom-2' style={{width:'100px', right:'0', fontWeight:'bold'}}>
                  + Add
                </button>
              </div>
              <div className='m-3' style={{border:'1px solid rgb(68, 114, 231)'}}></div>
            </div>
          </div>
        );
    }
};

export default Home;