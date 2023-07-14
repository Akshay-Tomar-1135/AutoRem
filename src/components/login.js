import React, { Component, useState } from 'react';
import logo from './images/autorem logo.png'

import './css/signupin.css';
import { Link } from 'react-router-dom';
import Signup from './signup';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }
  render(){
    return(
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>
                        <img
                          src={logo}
                          style={{ width: "100px" }}
                          alt="logo"
                        />
                        <h2 style={{left:"10px"}}>AutoRem</h2>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <p>Please login to your account</p>
                        <div className='form-group mb-4'>
                          {/* <label className="form-label" htmlFor="email">
                            Username
                          </label> */}
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            onChange={(e)=> this.setState({email: e.target.value})}
                            value={this.state.email}
                            required
                          />
                        </div>
                        <div className='form-group mb-4'>
                          {/* <label className="form-label" htmlFor="password">
                            Password
                          </label> */}
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder='Password'
                            onChange={(e)=> this.setState({password: e.target.value})}
                            value={this.state.password}
                            required
                          />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Log in
                          </button>
                          {/* <a className="text-muted" href="#!">
                            Forgot password?
                          </a> */}
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to='/signup' className="btn btn-outline-danger">
                            Create new
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Welcome to AutoRem, your trusted auto reminder application!</h4>
                      <p className="small mb-0">
                      Gone are the days of manually sending reminders 
                      or worrying about missed appointments. 
                      Our innovative solution takes care of it all, 
                      ensuring your clients receive timely and 
                      personalized reminders without any hassle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// const Login = ()=>{
//   const [userDetails, setDetails] = useState({
//     email:"",
//     password:""
//   })

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     console.log(this.state);
//   }
//   return(
//     <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
//     <div className="container py-5 h-100">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col-xl-10">
//           <div className="card rounded-3 text-black">
//             <div className="row g-0">
//               <div className="col-lg-6">
//                 <div className="card-body p-md-5 mx-md-4">
//                   <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center"  }}>
//                     <img
//                       src={logo}
//                       style={{ width: "100px" }}
//                       alt="logo"
//                     />
//                     <h2 style={{left:"10px"}}>AutoRem</h2>
//                   </div>
//                   <form onSubmit={handleSubmit}>
//                     <p>Please login to your account</p>
//                     <div className='form-group mb-4'>
//                       {/* <label className="form-label" htmlFor="email">
//                         Username
//                       </label> */}
//                       <input
//                         type="email"
//                         id="email"
//                         className="form-control"
//                         placeholder="Email address"
//                         onChange={(e)=> setDetails({email: e.target.value})}
//                         value={userDetails.email}
//                       />
//                     </div>
//                     <div className='form-group mb-4'>
//                       {/* <label className="form-label" htmlFor="password">
//                         Password
//                       </label> */}
//                       <input
//                         type="password"
//                         id="password"
//                         className="form-control"
//                         placeholder='Password'
//                         onChange={(e)=> setDetails({password: e.target.value})}
//                         value={userDetails.password}
//                       />
//                     </div>
//                     <div className="text-center pt-1 mb-5 pb-1">
//                       <button
//                         className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
//                         type="button"
//                       >
//                         Log in
//                       </button>
//                       {/* <a className="text-muted" href="#!">
//                         Forgot password?
//                       </a> */}
//                     </div>
//                     <div className="d-flex align-items-center justify-content-center pb-4">
//                       <p className="mb-0 me-2">Don't have an account?</p>
//                       <button
//                         type="button"
//                         className="btn btn-outline-danger"
//                       >
//                         Create new
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
//                 <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                   <h4 className="mb-4">Welcome to AutoRem, your trusted auto reminder application!</h4>
//                   <p className="small mb-0">
//                   Gone are the days of manually sending reminders 
//                   or worrying about missed appointments. 
//                   Our innovative solution takes care of it all, 
//                   ensuring your clients receive timely and 
//                   personalized reminders without any hassle.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );
// }

export default Login;