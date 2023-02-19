import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../App'
import Logo from '../Images/Derana.png'

const Navbar = () => {
    const { state } = useContext(UserContext)
    const renderList = () => {
        //console.log(state?.userRole)

        if (state?.userRole == 1) {
            return [
                <li>
                    <NavLink style={{ textDecoration: "none" }} to="/adminProfile">
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Profile <i className="fa fa-user me-2" />
                        </button>
                    </NavLink>
                </li>,
                <li>
                    <Link style={{ textDecoration: "none" }} to="/upload">
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Upload <i className="fa fa-upload me-2" />
                        </button>
                    </Link>
                </li>,
                <li>
                    <Link to="/" style={{ textDecoration: "none" }}
                        onClick={() => localStorage.clear()
                            .dispatch({ type: "CLEAR" })}>
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Logout <i className="fa fa-sign-out me-2" />
                        </button>
                    </Link>
                </li>
            ]
        } if (state?.userRole == 0) {
            return [
                <li>
                    <Link to="/" style={{ textDecoration: "none" }}
                        onClick={() => localStorage.clear()
                            .dispatch({ type: "CLEAR" })}>
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Logout <i className="fa fa-sign-out me-2" />
                        </button>
                    </Link>
                </li>
            ]
        } else {
            return [
                <li>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Login <i className="fa fa-sign-in me-2" />
                        </button>
                    </Link>
                </li>,
                <li>
                    <Link style={{ textDecoration: "none" }} to="/register">
                        <button className="btn btn-outline-danger ms-9 px-4 rounded-pill btn_log">
                            Registration <i className="fa fa-user-plus me-2" />
                        </button>
                    </Link>
                </li>
            ]
        }
    }
    return (
        <div>
            <nav className="navbar bg-body-tertiary shadow fixed-top">
                <div className="container-fluid">
                    <Link to={state ? "/article" : "/"} className="navbar-brand">
                        <img src={Logo} alt="Logo" className="d-inline-block align-text-top-4" style={{ width: "32px", height: "30px" }} />
                        &nbsp;Sri Lanka's Premium 24x7 News Portal
                    </Link>
                    <p className='text-center fw-bolder fs-5 mb-2'>{state?.userRole == 1 ? "Admin" : ""} </p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        {renderList()}
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar