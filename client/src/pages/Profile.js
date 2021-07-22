import React, { useState } from 'react';
import Axios from "axios";

const Profile = () => {

    const [imageSelected, setImageSelected] = useState();
     const [fileInputState, setFileInputState] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [previewSource, setPreviewSource] = useState()

    // handle form add art submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);

    };

    const handleChange = (e) => {
        console.log(e.target.name)
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    //preview image selected
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(reader.result)
        }
    }

/*     const uploadImage = () => {
        console.log(imageSelected)
        const formData = new FormData()
        formData.append("file", imageSelected);
        formData.append("upoload_preset", "aaxfejm1");
        console.log(formData.files)

        Axios.post("https://api.cloudinary.com/v1_1/dg14lkrkd/upload", formData
        ).then((response) => 
            { console.log(response) });
    };   */    
    
    const uploadImage = async (base64EncodedImage) =>{
        console.log(base64EncodedImage);
        try{
            await fetch("/api/upload", {
                method:"POST", 
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {"Content-type":"application/json" }
            }
                )

        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div>
        <form id="add-art" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Art Title</label>
                <input type="text" name="title" onBlur={handleChange}></input>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" onBlur={handleChange}></input>
            </div>
            <div>
                <label htmlFor="medium">Medium</label>
                <input type="text" name="description" onBlur={handleChange}></input>
            </div>
            <div>
                <label htmlFor="sellingprice">Sell Price</label>
                <input type="text" name="sellingprice" onBlur={handleChange}></input>
            </div>
            <div>
                <label htmlFor="imageupload">Upload Art image</label>
                <input type="file" name="imageupload" value={fileInputState} onChange={handleFileInputChange}></input>
            </div>

            <button data-testid="button" type="submit" onClick={uploadImage}>
                Submit
            </button>
        </form>
        {previewSource && (<img src={previewSource}/>)}
        </div>
    )
};

export default Profile;
