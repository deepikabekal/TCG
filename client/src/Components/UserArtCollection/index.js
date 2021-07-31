import React from 'react'

const UserArtCollection = ({userArts}) => {
    if (!userArts.length)
    {
        return (
            <div>
                <h2 className="col-12 text-bold m-2">Your art collection</h2>
                <p className=" col-12 m-2"> You have no art in your collection. You can upload your art by filling the "Add your artwork" form. </p>
            </div>
        )
    }
    return (
        <div className="row d-flex justify-content-between">
            <h2 className="col-12 text-bold m-2">Your art collection</h2>
                <div className="row row-cols-1 row-cols-md-2 m-2"> 
                    {userArts && userArts.map(artwork => (
                        <div key={artwork._id} className="col mb-4">
                            <div className="card card-feature h-100">
                                <img className="image img-thumbnail" alt="your art" src={artwork.image} />
                                <div className="card-body card-feature">
                                    <div className="justify-space-between-lg flex-row">
                                        <div>
                                            <h5 className="card-title"> {artwork.title} </h5>
                                        </div>
                                        <div className="flex-column text-center">
                                            <span className="span-text text-bold">${artwork.price}</span>
                                        </div>
                                    </div>
                                        <p className="card-text">Artist: {artwork.artist} </p>
                                        <p className="card-text">Votes: {artwork.vote.length} </p>
                                        <p className="card-text">Description: {artwork.description}</p>
                                        <p className="card-text">Medium: {artwork.medium}</p>
                                        <p className="card-text">Dimensions: {artwork.dimensions}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default UserArtCollection
