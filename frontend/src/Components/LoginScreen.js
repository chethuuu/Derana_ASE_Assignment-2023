import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { UserContext } from "../../src/App"
import ReCAPTCHA from "react-google-recaptcha";

function LoginScreen() {
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verified, setVerified] = useState(false);

  const loginUser = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      Swal.fire("Fail!", "Please give a valid E-mail Address", "error")
      return
    }
    fetch('http://localhost:5000/login', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        Swal.fire("Sorry", "Error Occured!", "error")
      } else {
        Swal.fire("Congrats", "You're Login Sucessfully!", "success")
        dispatch({ type: "USER", payload: data.user })
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  //reCaptcha
  function reCaptcha(value) {
    console.log("Captcha value:", value);
    setVerified(true)
  }

  return (
    <div>
      <br /><br /><br />
      <div className="container shadow my-4">
        <div className="row justify-content-end">
          <div className="col-md-6 d-flex flex-column align-items-center text-dark justify-content-center form order">
            <h1 className="display-4 fw-bolder text-center"> Welcome </h1>
            <p className="lead text-center"> Enter User Details to Login </p>
            <h5 className="mb-4">OR</h5>
            <Link to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</Link>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-2">LOGIN</h1> <br />

            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" aria-describedby="emailHelp"
              value={email} onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div> <br />
            <ReCAPTCHA
              sitekey="6LfVJi8kAAAAAHOzrYzNFHVtspPGZA88z2UDnGM3"
              onChange={reCaptcha} required /> <br />
            <button type="submit" class="btn btn-danger w-100 mx-auto rounded-pill"
              name="action" onClick={loginUser}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen