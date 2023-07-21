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
import logo from './images/autorem logo.png'

export default class Sidebar extends Component{
    constructor(props){
        super(props);
    }
    toggleProfile(){
        this.props.updateState(!this.props.state);
    }
    render(){
        return(
            <CDBSidebar textColor="rgb(68, 114, 231)" backgroundColor='white'
                style={{borderRadius:'10px'}} toggled='true '
              >
                <CDBSidebarHeader prefix={<i><img
                    src={logo}
                    alt="logo"
                    style={{ width: '60px' }}
                    /></i>}>
                {/* <div style={{ display: 'flex', alignItems: 'right' }}> */}
                    <h4 className='ms-4 mb-0 my-3'>AutoRem</h4>
                {/* </div> */}
                </CDBSidebarHeader>
    
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                    <CDBSidebarMenuItem 
                        className='siderbarMenu mx-1' 
                        icon="user" 
                        onClick={()=>this.toggleProfile}>
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
        );
    }
}