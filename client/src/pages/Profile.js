import React, { useState } from "react"

import { Redirect, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { ADD_ART } from "../utils/mutations"
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

    const [addArt, { error }] = useMutation(ADD_ART);

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
                    ) : <img src={image} style={{ width: "300px" }} />
                }
            </div>

            <button className="btn btn-grad" data-testid="button" type="submit">Submit</button>
        </form>
    )

}

export default Profile;