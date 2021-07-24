import React from 'react';
import Artwork1 from '../../Assets/artwork1.jpeg';

const ArtContainer= () => {
     {/*ArtContainer info will be populated with data received from Database - all artword query*/}
    return (
        <div className="col-6 p-2">
            <div className="card">
                <img className="card-img-top p-3" src={Artwork1} alt="art" />
                <div className="card-body">
                    <h5 className="card-title">Landscape</h5>
                    <p className="card-text">Artist Name</p>
                    
                    <div className="row">
                        <a href="#" className="btn btn-primary col mx-3">Vote</a>
                        <a href="#" className="btn btn-primary col mx-3">Buy</a>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ArtContainer;
