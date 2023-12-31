import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


function PhotoById() {
  const param = useParams();
  const photos = useSelector(state => state.photos.photo);
  const data = photos.filter((item) => {
    return item._id == param.Id
  });

  useEffect(() => {
    const getviews = async () => {
      let result = await fetch('http://localhost:8000/api/posts/' + param.Id, {
        headers: new Headers({
          'Authorization': localStorage.getItem('auth'),
          'Content-Type': 'application/json'
        }),
      });
    }
    getviews();
  }, [])

  return (
    <>
      {
        data[0] ?
          <>
            <div className="container ">
              <h3>Views: {data[0].views} </h3>
              <img src={data[0].imageUrl} className="img-fluid" alt="Responsive image" style={{ border: "1px solid black" }} />
              <h2  >Title </h2>
              <h3 className='text-center text-capitalize underline' > <u>{data[0].title}</u> </h3>
              <h4>Description</h4>
              <p className='text-center border rounded ' >{data[0].description}</p>
            </div>
          </>
          :
          <h1>Something went wrong</h1>
      }
    </>
  )
}

export default PhotoById