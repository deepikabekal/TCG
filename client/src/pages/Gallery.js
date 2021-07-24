import React from 'react';
import ArtContainer from '../Components/ArtContainer/ArtContainer';

const Gallery = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="col-12 text-center">
                    GALLERY
                </h1>
                <p className="col-12 text-center">
                    Browse and vote on your favorite artwork. Artwork with more the 10 votes will be up for sell.
                </p>
            </div>
            <div className="row d-flex justify-content-between">
                {/*use .map to render ArtContainer based on query data received from Database*/}
                <ArtContainer></ArtContainer>
                <ArtContainer></ArtContainer>
                <ArtContainer></ArtContainer>
                <ArtContainer></ArtContainer>
            </div>
        </div>
    )
}

export default Gallery;
