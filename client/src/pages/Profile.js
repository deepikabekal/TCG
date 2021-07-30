import React, { useState } from "react"

//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_ART, REMOVE_ART } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { removeArgumentsFromDocument } from "@apollo/client/utilities";
import Auth from '../utils/auth';

function Profile() {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [formInfo, setFormInfo] = useState({
        title: "",
        description: "",
        medium: "",
        dimensions: "",
        price: 0,
        image: ""
    })

    const [addArt] = useMutation(ADD_ART);
    const [removeArt] = useMutation(REMOVE_ART)

    //use useQuery hook to make ME query request get all user added artwork
    const { data } = useQuery(QUERY_ME);
    //optional chaining negates the need to check if an object even exists 
    const artistCollection = data?.me.arts || [];
    console.log(artistCollection);

    const handleChange = e => {
        const { value, name } = e.target

        setFormInfo((prevValue) => {
            if (name === "price") {
                return { ...prevValue, [name]: parseInt(value, 10) }
            } else {
                return {
                    ...prevValue,
                    [name]: value
                }
            }
        })
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "jq4k8cp4")
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dg14lkrkd/image/upload",
            {
                method: 'POST',
                body: data
            })

        // response from cloudinary with url of uploaded image
        const file = await res.json()
        console.log(file)

        setImage(file.secure_url)

        //assign the cloudinary generated url to the image field of the form object
        setFormInfo((prevValue) => {
            return {
                ...prevValue,
                image: file.secure_url
            }
        })
        setLoading(false)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

            const { data } = await addArt({
                variables: { ...formInfo },
            });

            // clear form value
            setFormInfo({
                title: "",
                description: "",
                medium: "",
                dimensions: "",
                price: 0,
                image: ""
            });

            window.location.reload();

        } catch (e) {
            console.error(e);
        }
    };

    const handleRemoveArt = async (artId) => {
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
            return false;
        }

        try {
            await removeArt({               
                 variables: {artId}
                 
            });

            removeArt(artId);

            } catch (err) {
                console.error(err);
            }
    };


    return (
        <div className ="flex-row justify-center mb-4">
            <div className="col-12 col-md-6">
            <div className='card'>
                <h4 className="card-header">Add your artwork</h4>
                <div className="card-body">
                    <form id="add-art" onSubmit={handleFormSubmit}>
                        <div className="label-input-container">
                            <label htmlFor="title">Art Title</label>
                            <input type="text" name="title" onChange={handleChange}></input>
                        </div>
                        <div className="label-input-container" >
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" onChange={handleChange} ></input>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="medium">Medium</label>
                            <input type="text" name="medium" onChange={handleChange}></input>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="medium">Dimensions</label>
                            <input type="text" name="dimensions" onChange={handleChange}></input>
                        </div>
                        <div className="label-input-container">
                            <label htmlFor="sellprice">Selling Price</label>
                            <input type="text" name="price" onChange={handleChange}></input>
                        </div>
                        <div className="label-input-container">
                            <label >Upload Art image</label>
                            <input type="file" name="image" onChange={uploadImage}></input>
                            {
                                loading ? (
                                    <h3>Loading...</h3>
                                ) : <img className="display-img" src={image} alt="" style={{ width: "300px" }} />
                            }
                        </div>
                        <button className="btn btn-grad" data-testid="button" type="submit">Add To Gallery</button>
                    </form>
                </div>
            </div>
            </div>
            
            <div className="row d-flex justify-content-between">
                <h1 class="col-12 text-center">My Featured Artwork</h1>
                {artistCollection && artistCollection.map(artwork => (
                    <div key={artwork._id} className="col-6 p-2">
                        <div className="card">
                            <img className="card-img-top p-3" src={artwork.image} alt="art" />
                            <div className="card-body">
                                <h5 className="card-title"> {artwork.title} </h5>
                                <p className="card-text"> {artwork.artist} </p>
                                <p className="card-text"> {artwork.description}</p>
                                <p className="card-text"> {artwork.price}</p>
                                <p className="card-text"> {artwork.medium}</p>
                                <p className="card-text"> {artwork.dimensions}</p>
                            </div>
                            <a href="#" className="btn btn-grad mx-3" onClick={handleRemoveArt()}>Remove</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>




    )

}

export default Profile;