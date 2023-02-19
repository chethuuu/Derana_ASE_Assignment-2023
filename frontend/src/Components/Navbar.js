import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        //console.log(state?.userRole)

        if (state) {
            return [
                <li>
                    <NavLink style={{ textDecoration: "none" }} to="/profile">
                        <button className="btn btn-outline-primary ms-9 px-4 rounded-pill btn_log">
                            Profile <i className="fa fa-user me-2" />
                        </button>
                    </NavLink>
                </li>,
                <li>
                    <Link style={{ textDecoration: "none" }} to="/upload">
                        <button className="btn btn-outline-primary ms-9 px-4 rounded-pill btn_log">
                            Create <i className="fa fa-upload me-2" />
                        </button>
                    </Link>
                </li>,
                <li>
                    <Link to="/" style={{ textDecoration: "none" }}
                        onClick={() => localStorage.clear()
                            .dispatch({ type: "CLEAR" })}>
                        <button className="btn btn-outline-primary ms-9 px-4 rounded-pill btn_log">
                            Logout <i className="fa fa-sign-out me-2" />
                        </button>
                    </Link>
                </li>
            ]
        } else {
            return [
                <li>
                    <Link style={{ textDecoration: "none" }} to="/">
                        <button className="btn btn-outline-primary ms-9 px-4 rounded-pill btn_log">
                            Login <i className="fa fa-sign-in me-2" />
                        </button>
                    </Link>
                </li>,
                <li>
                    <Link style={{ textDecoration: "none" }} to="/register">
                        <button className="btn btn-outline-primary ms-9 px-4 rounded-pill btn_log">
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
                    <Link to={state ? "/article" : "/article"} className="navbar-brand">
                        <img src='' alt="Logo" className="d-inline-block align-text-top" style={{ width: "32px", height: "30px" }} />
                        Derana
                    </Link>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        {renderList()}
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar