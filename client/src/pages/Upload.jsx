import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        title: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const [Images, setImages] = useState([]);
    const [ImageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        if (Images.length < 1) return;
        const newImageUrls = [];
        newImageUrls.push(URL.createObjectURL(Images[0]));
        setImageUrls(newImageUrls);
    }, [Images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description } = values;

        if (title === '' || description === '' || Images.length <= 0) {
            return alert('All fields are required');
        }

        const formData = new FormData();
        formData.append('image', Images[0]); // Assuming Images is an array containing the selected file
        formData.append('title', title);
        formData.append('description', description);

        try {
            const result = await fetch('http://localhost:8000/api/posts', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': localStorage.getItem('auth')
                }),
                body: formData,
            });
            
            if (result.status == 201) {
                setValues({
                    title: '',
                    description: '',
                });
                setImages([]);
                setImageUrls([]);
                alert('Created Success');
            }
            if(result.status == 401){
                localStorage.clear();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="card-body p-3 text-center" >
                <form onSubmit={handleSubmit} >
                    <div className="form-group m-3">
                        <label htmlFor="formGroupExampleInput">Title</label>
                        <input type="text" name='title' className="form-control" id="formGroupExampleInput" placeholder="Example input" value={values.title} onChange={handleInputChange} />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="formGroupExampleInput2">Description</label>
                        <textarea id='formGroupExampleInput2' name="description" cols="40" className="form-control" rows="4" value={values.description} onChange={handleInputChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlFile1" className='p-3' >File input</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" accept='image/*' onChange={onImageChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
                {
                    Images.length > 0 ?
                        <div className="card" style={{ width: "18rem", alignItems: "center" }}>
                            <img src={ImageUrls} className="card-img-top" alt="..." />
                        </div> :
                        <></>
                }

            </div>
        </div>
    )
}

export default Upload;