import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/autorem logo.png';
import './css/signupin.css';

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fname, lname, email, password });
    fetch('http://localhost:8000/signup', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate('/login');
        }
        else{
            setError(data.error);
        }
        console.log(data, 'userRegister');
      });
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Welcome to AutoRem - where convenience meets productivity</h4>
                    <p className="small mb-0">
                      Join and transform your appointment management with AutoRem. Sign up today and unlock the
                      power of automated reminders to ensure a seamless and streamlined experience for both you
                      and your clients.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center d-flex align-items-center justify-content-center">
                      <img src={logo} style={{ width: '100px' }} alt="logo" />
                      <h2 style={{ left: '10px' }}>AutoRem</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Please create to your account</p>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="First Name"
                          onChange={(e) => setFname(e.target.value)}
                          value={fname}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          id="lname"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={(e) => setLname(e.target.value)}
                          value={lname}
                        />
                      </div>
                      <div className="form-group mb-4">
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
                      <div className="form-group mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                      </div>
                      {error && <div style={{ color: 'red' }}>{error}</div>}
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 pt-2 pb-2"
                          type="submit"
                          style={{ fontSize: '14px' }}
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already registered?</p>
                        <Link to="/" className="btn btn-outline-primary" style={{ fontSize: '14px' }}>
                          Log in
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
