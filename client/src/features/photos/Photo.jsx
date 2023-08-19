import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotos } from './photoSlice';
import { useNavigate } from 'react-router-dom';

function Photo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    function handleClick(data) {
        navigate('/' + data);
    }

    const photos = useSelector(state => state.photos.photo);

    return (
        <>
            <div className="container text-center">
                <h1>Photos</h1>
                <div className="row row-cols-3" style={{ justifyContent: "space-between" }}  >
                    {
                        photos ?
                            photos.map((item) => {
                                return (
                                    <>
                                        <div className="card col" key={item._id} style={{ width: "18rem", marginBottom: "40px" }} >
                                            <img src={item.imageUrl} className="card-img-top" alt="image" />
                                            <div className="card-body">
                                                <p className="card-text">{item.title}</p>
                                                <button className='btn btn-success' onClick={() => handleClick(item._id)} > View </button>
                                            </div>
                                        </div>

                                    </>
                                )

                            })
                            :
                            <h1>No data</h1>
                    }

                </div>
            </div >

        </>
    )
}

export default Photo