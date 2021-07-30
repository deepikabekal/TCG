import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';
import ArtContainer from '../Components/ArtContainer/ArtContainer.js';

const Gallery = () => {

    //use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_ARTS);
    //optional chaining negates the need to check if an object even exists 
    const artCollection = data?.arts || [];
    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="col-12 text-center">
                    GALLERY
                </h1>
                <p className="col-12 text-center">
                    Browse and vote on your favorite artwork. Artwork with more the 10 votes will be up for sale.
                </p>
            </div>
           
           <ArtContainer arts={artCollection} ></ArtContainer>
           
        </div>
    )
}

export default Gallery;
