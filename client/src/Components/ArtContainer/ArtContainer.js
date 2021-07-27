import React from 'react';

const ArtContainer = ({ arts }) => {
     {/*Data from artCollection*/}
     if (!arts.length) {
         return <h2>No Artwork on display! 😱 </h2>
     }
    return (
        <div className="row row-cols-1 row-cols-md-2">
        {arts && arts.map( artwork => (
        <div key={artwork._id} className="col mb-4">
            <div className="card card-feature h-100">
                <img className="image-gallery img-thumbnail" src={artwork.image} alt="art" />
                <div className="card-body card-feature ">
                    {/* <div className="justify-space-between-lg flex-row"> */}
                            <h5 className="card-title art-title-text text-color"> {artwork.title} </h5>
                            <p className="card-text">Artist: {artwork.artist} </p>
                            <p className="card-text">Description: {artwork.description}</p>
                        <div>
                            <a href="#" className="btn btn-grad mx-3">Vote  </a>
                            <a href="#" className="btn btn-grad mx-3">Buy ${artwork.price}</a>
                        </div>
                    {/* </div> */}
                </div>
            </div> 
        </div>
        ))}
        </div>
    );
};

export default ArtContainer;
