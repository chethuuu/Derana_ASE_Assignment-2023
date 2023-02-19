import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App';
import { useParams } from 'react-router-dom'

const ViewArticlebyID = () => {
    const { id, location, body } = useParams();
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext)
    console.log('render')

    useEffect(() => {
        fetch(`http://localhost:5000/article/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result)
            })
    }, [])

    return (
        <section className="h-100 h-custom gradient-custom-2 container w-75 py-5">
            <div className="py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div class="card container shadow w-75 py-5 mb-3" style={{ border: "none" }}>
                            {
                                data ? (
                                    <div>
                                        <h1>{data.location}</h1> <br />
                                        <h6>{new Date(data.createdAt).toLocaleDateString()} || {new Date(data.createdAt).toLocaleTimeString()}</h6>
                                        <img src={data.postImg} class="card-img-top" alt="" /> <br /><br />
                                        <p style={{ textAlign: "justify", fontSize: "20px" }}>{data.body}</p>
                                    </div>
                                ) : (
                                    <p>Loading article details...</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewArticlebyID