import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function UpdateArticle() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedArticle = { topic, body };
        fetch(`http://localhost:5000/article/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(updatedArticle),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                Swal.fire("Congrats", "Article Sucessfully Updated!", "success")
                navigate('/article')
            })
            .catch((error) => {
                console.error(error);
                Swal.fire("Sorry", "Error Occured!", "error")
            });
    };

    useEffect(() => {
        fetch(`http://localhost:5000/article/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setTopic(data.topic);
                setBody(data.body);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    return (
        <div>
            <section className="mt-5 h-100 h-custom gradient-custom-2">
                <div className="container py-5 h-100 w-50">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 mt-5">
                            <div class="card mb-3" style={{ width: "100%" }}> <br />
                                <center><h3 className='display-6 fw-bolder'>Update Article</h3></center> <br />
                                <div class="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Topic</label>
                                            <input type="text" name="topic" className="form-control" aria-describedby="emailHelp"
                                                value={topic}
                                                onChange={(event) => setTopic(event.target.value)}
                                                placeholder='Add a Topic' />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea type="text" name="body" className="form-control"
                                                rows="4" cols="50"
                                                value={body}
                                                onChange={(event) => setBody(event.target.value)}
                                                placeholder='Write a Description'
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Add Image</label>
                                            <input type="file" name="image" className="form-control"
                                            />
                                        </div>
                                        <button className="btn btn-danger w-100 mt-4 rounded-pill"
                                            type="submit" name="action">
                                            Update Article
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UpdateArticle;