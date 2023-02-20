import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function CreateArticle() {
    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")

    const uploadPost = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Instagram_demo");
        data.append("cloud_name", "agriproduct");
        fetch("https://api.cloudinary.com/v1_1/agriproduct/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url);
            }).catch(err => {
                console.log(err);
            })

        fetch('http://localhost:5000/article/', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                topic: topic,
                body: body,
                picture: url
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                Swal.fire("Fail", "Error Occured, Try Again!", "error")
            } else {
                Swal.fire("Congrats", "You're Successfully Uploaded Article to feed!", "success")
                navigate('/article')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <section className="mt-5 h-100 h-custom gradient-custom-2">
            <div className="container py-5 h-100 w-50">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 mt-5">
                        <div class="card mb-3" style={{ width: "100%" }}> <br />
                            <center><h3 className='display-6 fw-bolder'>Upload Article</h3></center> <br />
                            <div class="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Topic</label>
                                    <input type="text" name="topic" className="form-control" aria-describedby="emailHelp"
                                        value={topic} onChange={(e) => setTopic(e.target.value)}
                                        placeholder='Add Topic' />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" name="body" className="form-control"
                                        value={body} onChange={(e) => setBody(e.target.value)}
                                        placeholder='Write Description'
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Add Image</label>
                                    <input type="file" name="image" className="form-control"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <button className="btn btn-danger w-100 mt-4 rounded-pill"
                                    onClick={() => uploadPost()} type="submit" name="action">
                                    Upload Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateArticle