import React from 'react';

const ArtContainer = ({ arts }) => {
     {/*Data from artCollection*/}
     if (!arts.length) {
         return <h2>No Artwork on display! 😱 </h2>
     }
    return (
        <div className="row d-flex justify-content-between">
        {arts && arts.map( artwork => (
        <div key={artwork._id} className="col-6 p-2">
            <div className="card">
                <img className="card-img-top p-3" src={artwork.image} alt="art" />
                <div className="card-body">
                    <h5 className="card-title"> {artwork.title} </h5>
                    <p className="card-text"> {artwork.artist} </p>
                    
                    <div className="row">
                        <a href="#" className="btn btn-primary col mx-3">Vote</a>
                        <a href="#" className="btn btn-primary col mx-3">Buy</a>
                    </div>
                </div>
            </div> 
        </div>
        ))}
        </div>
    );
};

export default ArtContainer;
