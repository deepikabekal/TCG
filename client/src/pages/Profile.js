import React, { useState } from 'react';

const Profile = () => {
    const [fileInputState, setFileInputState] = useState()
    const [previewSource, setPreviewSource] = useState()

    // handle form add art submit and image post to cloudinary
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);

    };

    const handleChange = (e) => {
        console.log(e.target.name)
    }

    //listens for file name change input
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    //preview image selected
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        try {
            await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { "Content-type": "application/json" }
            }
            )

        } catch (error) {
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
            {previewSource && (<img style={{height:"200px"}}src={previewSource} />)}
        </div>
    )
};

export default Profile;
