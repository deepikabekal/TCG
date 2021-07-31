import React from 'react';
//import { QUERY_ME } from "../../utils/queries";
//import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';


const ArtContainer = ({ arts }, ) => {
    
    
    console.log(arts, "artcontainer")
    //console.log("container", user)
    //console.log('userid', user._id)

    async function vote (artwork) {
        const user = Auth.getProfile().data
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
        window.location.reload();
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

    //  const loginRequired = function() {

    //  }

     const addToCart = function() {
        console.log("coming soon")
    }
    
    return (
        <div className="row row-cols-1 row-cols-md-2">

            {arts && arts.map( artwork => (
                <div key={artwork._id} className="col mb-4">
                    <div className="card card-feature h-100">
                        <img className="image-gallery img-thumbnail" src={artwork.image} alt="art" />
                        <div className="card-body card-feature">
                                    <div className="row d-flex justify-content-between">
                                    <h5 className="card-title art-title-text text-color px-3"> {artwork.title} </h5>
                                    <h5 className="card-title art-title-text text-color px-3">By: {artwork.artist} </h5>
                                    </div>
                                    <p className="card-text">Description: {artwork.description}</p>
                                
                                
                                {Auth.loggedIn() ? (
                                    <>
                                    <div className="row d-flex justify-content-between">
                                        <button className="btn btn-grad mx-3" onClick={() => vote (artwork)}>Vote {artwork.vote.length} </button>
                                        <button disabled={artwork.vote.length < 10} className="btn btn-grad mx-3" onClick={addToCart}>Buy ${artwork.price}</button>
                                    </div>
                                    </>) : (
                                        <>
                                     <div>
                                        <Link to="/login" className="btn btn-grad mx-3" >Login to vote {artwork.vote.length} </Link>
                                        <Link to="/login" className="btn btn-grad mx-3" >Login to purchase {artwork.price} </Link>
                                    </div>
                                    </>
                                    )
                                }
                               

                        </div>
                    </div> 
                </div>
                ))}
     
        </div>
    );
};

export default ArtContainer;
