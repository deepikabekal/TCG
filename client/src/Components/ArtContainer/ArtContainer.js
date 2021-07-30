import React from 'react';
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

const ArtContainer = ({ arts }, ) => {
     {/*Data from artCollection*/}
     const user = Auth.getProfile().data
     console.log(arts, "artcontainer")
    console.log("container", user)
    console.log('userid', user._id)

    async function vote (artwork) {
        console.log('You clicked vote.', artwork);
        await fetch('/api/vote', {
            method: 'PUT',           
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user._id,
                artId: artwork._id
            }) 
        });
    }
     if (!arts.length) {
        //  arts = [{
        //     _id: '12345',
        //     image: 'https://cdn.cnn.com/cnnnext/dam/assets/200724205055-standardized-test-bubble-sheet-stock-large-169.jpg',
        //     title: 'Test',
        //     artist: 'Bob Smith',
        //     price: 5
        //  }];
        return <h2>No Artwork on display! 😱 </h2>
     }
    
    return (
        <div className="row row-cols-1 row-cols-md-2">

            {arts && arts.map( artwork => (
                <div key={artwork._id} className="col mb-4">
                    <div className="card card-feature h-100">
                        <img className="image-gallery img-thumbnail" src={artwork.image} alt="art" />
                        <div className="card-body card-feature">
                            {/* <div className="justify-space-between-lg flex-row"> */}
                                    <h5 className="card-title art-title-text text-color"> {artwork.title} </h5>
                                    <p className="card-text">Artist: {artwork.artist} </p>
                                    <p className="card-text">Description: {artwork.description}</p>
                                <div>
                                    <a href="#" className="btn btn-grad mx-3" onClick={() => vote (artwork)}>Vote  </a>
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
