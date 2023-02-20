import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../../App"

const ProfileScreen = () => {
    const [myPost, setMyPost] = useState([]);
    const { state } = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:5000/article/myArticle', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setMyPost(result.myPost)
            })
    }, [])

    return (
        <div>
            <section class="py-5 vh-100">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center h-100">
                        <div class="col col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style={{ borderRadius: "15px" }}>
                                <div class="card-body p-4">
                                    <div class="d-flex text-black">
                                        <div class="flex-shrink-0">
                                            <img src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                                                alt="Generic placeholder image" class="img-fluid"
                                                style={{ width: "180px", borderRadius: "10px" }} />
                                        </div>
                                        <div class="flex-grow-1 ms-3 mt-3">
                                            <h5 class="mb-1">{state?.name} - {state?.email}</h5>
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        {
                                            myPost.map(item => {
                                                return (
                                                    <div className="row py-3">
                                                        <div className="col">
                                                            <img key={item._id} src={item.postImg} alt='' style={{ width: "100%" }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileScreen