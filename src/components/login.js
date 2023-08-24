import React, { useState } from 'react';
import logo from './images/autorem logo.png'
import './css/signupin.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({ email, password });
    /* code to try getting stored cookies */

    // await fetch("http://localhost:8000/set-cookie", {
    //   method: 'GET',
    //   headers: {
    //     Accept: "application/json",
    //     credentials: 'include'
    //   }
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data.msg);

    //   // Second fetch call to get the cookie
    //   return fetch("http://localhost:8000/get-cookie", {
    //     method: 'GET',
    //     headers: {
    //       Accept: "application/json",
    //       credentials: 'include'
    //     }
    //   });
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data.msg);
    // })
    // .catch(error => {
    //   console.error("Error:", error);
    // });

    await fetch("http://localhost:8000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
        // credentials:'include'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate(`/home/${data.user._id}`);
        }
        else{
          setError(data.error);
        }
        console.log(data, "userLogin");
      });
  }

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center d-flex align-items-center justify-content-center">
                      <img
                        src={logo}
                        style={{ width: "100px" }}
                        alt="logo"
                      />
                      <h2 style={{ left: "10px" }}>AutoRem</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
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
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                      </div>
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block gradient-custom-2 mb-3 pt-2 pb-2"
                          type="submit"
                          style={{ fontSize: "14px" }}
                        >
                          Log in
                        </button>
                        {/* <a className="text-muted" href="#!">
                          Forgot password?
                        </a> */}
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <Link to='/signup' className="btn btn-outline-primary" style={{ fontSize: "14px" }}>
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

export default Login;
