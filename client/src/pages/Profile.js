import React, { useState } from "react"

import { Redirect, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

function Profile() {

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const [formInfo, setFormInfo] = useState({
        title: "",
        description: "",
        medium: "",
        sellprice: 0,
        image: ""
    })

    const handleChange = e => {

        const{ value, name} = e.target

        setFormInfo((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
        })

        console.log(formInfo)
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset","jq4k8cp4")
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

        setFormInfo((prevValue)=>{
            return {
                ...prevValue,
                image: file.secure_url
            }
        })
        setLoading(false)
        console.log("print full object")
        console.log(formInfo)
    }

    return (
        <form id="add-art">
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
            <label htmlFor="sellingprice">Sell Price</label>
            <input type="text" name="sellprice" onChange={handleChange}></input>
        </div>
        <div>
        <label >Upload Art image</label>
            <input type="file" name="image" onChange={uploadImage}></input>
            {
                loading?(
                    <h3>Loading...</h3>
                ):<img src={image} style={{width:"300px"}}/>
            }
        </div>

        <button data-testid="button" type="submit">Submit</button>
        </form>
    )

}

export default Profile;