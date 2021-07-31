import React, { useState } from "react"

//import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_ART } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
//import Auth from '../utils/auth';
import UserArtCollection from "../Components/UserArtCollection";
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
    //const [removeArt] = useMutation(REMOVE_ART)

    //use useQuery hook to make ME query request get all user added artwork
    const { data } = useQuery(QUERY_ME);
    console.log(data);
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
                image: file.secure_url,
                
            }
        })

        setLoading(false)
        document.getElementById('upload-img').className = "display-img"
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

    // const handleRemoveArt = async (artId) => {
        
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;
        
    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         await removeArt({               
    //              variables: {artId}
                 
    //         });

    //         removeArt(artId);

    //         } catch (err) {
    //             console.error(err);
    //         }
    // };


    return (
        <div className="flex-row justify-center" >
            <div className="col-12 col-md-4">
                <div className='card'>
                    <h4 className="card-header">Add your artwork</h4>
                    <div className="card-body">
                        <form id="add-art" onSubmit={handleFormSubmit}>
                                <input type="text" name="title" className="form-input" placeholder='Title' onChange={handleChange}></input>
                                <input type="text" name="description" className="form-input" placeholder='Description' onChange={handleChange} ></input>
                                <input type="text" name="medium" className="form-input" placeholder='Medium' onChange={handleChange}></input>
                                <input type="text" name="dimensions" className="form-input" placeholder='Dimensions' onChange={handleChange}></input>
                                <input type="text" name="price" className="form-input" placeholder='Price' onChange={handleChange}></input>
                            <div className="label-input-container">
                                <input type="file" name="image" onChange={uploadImage}></input>
                                {
                                    loading ? (
                                        <h3>Loading...</h3>
                                    ) : <img src={image} id="upload-img" alt=""  />
                                }
                            </div>
                            <button className="btn btn-grad" data-testid="button" type="submit">Add To Gallery</button>
                        </form>
                    </div>
                </div>
            </div>
            <UserArtCollection userArts={artistCollection}></UserArtCollection>

        </div>




    )

}

export default Profile;