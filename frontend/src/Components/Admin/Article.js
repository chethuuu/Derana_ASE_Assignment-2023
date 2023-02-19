import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App';
import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import Logo from '../../Images/Derana.png'
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from 'react-router-dom';

const Article = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext)
  const [serachItem, setserachItem] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/article/', {
      //method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.posts)
      })
  }, [])

  const LikePost = (id) => {
    //console.log(id)
    fetch('http://localhost:5000/article/like', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        //console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        })
        setData(newData);
      }).catch(err => {
        console.log(err);
      })
  }

  const UnlikePost = (id) => {
    //console.log(id)
    fetch('http://localhost:5000/article/unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then(result => {
        //console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        })
        setData(newData);
      }).catch(err => {
        console.log(err);
      })
  }

  const addComment = (text, postId) => {
    fetch('http://localhost:5000/article/comment', {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        })
        setData(newData);
      }).catch(err => {
        console.log(err);
      })
  }

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/article/${postId}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.filter(item => {
          return item._id !== result._id
        })
        setData(newData);
      })
  }



  return (
    <section className="h-100 h-custom gradient-custom-2">
      <div className="py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div class="input-group">
              <div className="col-md-6 mx-auto py-5">
                <input type="search" class="form-control" placeholder="Search by Article" aria-label="Search" onChange={event => { setserachItem(event.target.value) }}
                  aria-describedby="search-addon" />
              </div>
            </div>
            <div className="card card-registration card-registration-2" style={{ border: "none" }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-1">
                    <div className="p-5">
                      <div className="card" style={{ width: "100%", border: "none" }}>
                        <img className='derana' style={{ width: "5%" }} src={Logo} alt='' />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 ml-2 mb-5">
                    <div class="card mx-auto" style={{ width: "90%", border: "none" }}>
                      {
                        data && data.filter((data) => {
                          if (serachItem == "") {
                            return data
                          } else if (data.location.toLowerCase().includes(serachItem.toLowerCase())) {
                            return data
                          }
                        })
                          .map(item => {
                            return (
                              <div class="card-body shadow" style={{ marginBottom: "2%" }}>
                                {
                                  state?.userRole == 1
                                    ?
                                    <>
                                      <p class="text-end mt-1">
                                        {
                                          item.postedBy[0]._id == state._id
                                          &&
                                          <MdDelete style={{ fontSize: "25px", color: "#d11a2a", }}
                                            onClick={() => deletePost(item._id)} />

                                        }
                                      </p>
                                      <p class="text-end mt-1">
                                        {
                                          item.postedBy[0]._id == state._id
                                          &&
                                          <Link to={`/update/${item._id}`}>
                                            <MdEdit style={{ fontSize: "25px", color: "#cccc00" }} />
                                          </Link>
                                        }
                                      </p>

                                      <div class="d-flex align-items-center mb-2">
                                        <div class="flex-shrink-0">
                                          <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'
                                            alt="pic" class="img-fluid rounded-circle border border-dark border-3"
                                            style={{ width: "50px", height: "50px" }} />
                                        </div>
                                        <div class="flex-grow-1 ms-2">
                                          <div class="d-flex flex-row align-items-center mt-3 username">
                                            <h6>{item.postedBy[0].name}</h6>
                                          </div>
                                          <div class="mt-2">
                                            <p>{item.postedBy[0].email}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                    :
                                    ""
                                }

                                <div class="d-flex align-items-center mb-2">
                                  <h2 style={{ fontFamily: "Roboto" }}> {item.location}</h2>
                                </div>
                                <div className="row py-3">
                                  <div className="col-md-4">
                                    <img src={item.postImg} className="news-img" style={{ width: "100%" }} alt='' />
                                  </div>
                                  <div className="col-md-8 read-more" style={{ fontFamily: "Tinos" }}>
                                    <ReactReadMoreReadLess
                                      charLimit={460}
                                      readMoreText={<Link to={`/${item._id}`} style={{ color: "#d11a2a", textDecoration: "none", cursor: "pointer" }}>Read more ▼</Link>}
                                    >
                                      {item.body}
                                    </ReactReadMoreReadLess>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                  <div class="p-2">
                                    {
                                      item.likes.includes(state._id)

                                        ?
                                        <span class="fa fa-heart" style={{ fontSize: "18px", color: "red" }}
                                          onClick={() => (UnlikePost(item._id))}></span>

                                        :

                                        <i class="fa fa-heart-o" style={{ fontSize: "18px" }}
                                          onClick={() => (LikePost(item._id))}></i>

                                    }
                                    <h6>{item.likes.length} likes</h6></div>
                                  <div class="p-2">{(Math.floor((new Date() - new Date(item.createdAt)) / (1000 * 60 * 60 * 24)))}d</div>
                                </div>
                                <h6><b>{item.postedBy[0].username}</b></h6>
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  console.log(e.target[0].value);
                                  addComment(e.target[0].value.item._id);
                                }}>
                                  <input type="text" placeholder='Type here...' className='form-control' />
                                </form>
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card" style={{ width: "100%", border: "none" }}>
                      <center>
                        <div className='' style={{ position: "fixed" }}>
                          <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='' className='rounded-circle' style={{ width: "40%" }} />
                          <h4>{state.name}</h4>
                          <h5>{state.email}</h5>
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Article