import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from "sweetalert2";

function RegisterScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerUser = () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      Swal.fire("Fail!", "Please give a valid E-mail Address", "error")
      return
    }
    fetch('http://localhost:5000/register', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        Swal.fire("Fail", "Please Fill all the Fields!", "error")
      } else {
        Swal.fire("Congrats", "You're Successfully Register", "success")
        navigate('/')
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const SendData = () => {
    registerUser();
  }

  return (
    <div>
      <br /><br /><br />
      <div className="container shadow my-4">
        <div className="row justify-content-end">
          <div className="col-md-6 d-flex flex-column align-items-center text-dark justify-content-center form order">
            <h1 className="display-4 fw-bolder text-center"> Welcome </h1>
            <p className="lead text-center"> Enter User Details to Register </p>
            <h5 className="mb-4">OR</h5>
            <Link to="/" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</Link>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-2">REGISTER</h1>

            <div className="row py-3">
              <div className="col-md-12">
                <label for="name">Name</label>
                <input type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row py-1">
              <div className="col-md-12">
                <label for="email">E-mail</label>
                <input type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
            </div>

            <div className="row py-3">
              <div className="col-md-12">
                <label for="name">Password</label>
                <input type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" class="btn btn-danger w-100 mt-4 rounded-pill"
              name="action" onClick={SendData}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen