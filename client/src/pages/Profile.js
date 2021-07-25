import React, { useState } from "react"

//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_ART } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
//import Auth from '../utils/auth';

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

            console.log(formInfo)

        } catch (e) {
            console.error(e);
        }
    };



    return (
        <div>
            <form id="add-art" onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="title">Art Title</label>
                <input type="text" name="title" onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" onChange={handleChange} ></input>
            </div>
            <div>
                <label htmlFor="medium">Medium</label>
                <input type="text" name="medium" onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="medium">Dimensions</label>
                <input type="text" name="dimensions" onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="sellprice">Sell Price</label>
                <input type="text" name="price" onChange={handleChange}></input>
            </div>
            <div>
                <label >Upload Art image</label>
                <input type="file" name="image" onChange={uploadImage}></input>
                {
                    loading ? (
                        <h3>Loading...</h3>
                    ) : <img src={image} alt="" style={{ width: "300px" }} />
                }
            </div>

            <button data-testid="button" type="submit">Submit</button>
        </form>

        <div className="row d-flex justify-content-between">
        {artistCollection && artistCollection.map( artwork => (
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
            </div> 
        </div>
        ))}
        </div>
        </div>
        

            
        
    )

}

export default Profile;