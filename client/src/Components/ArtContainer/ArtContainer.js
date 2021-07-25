import React from 'react';

const ArtContainer = ({ arts }) => {
     {/*Data from artCollection*/}

     if (!arts.length) {
         arts.push({
            _id: 'twingle',
            image: 'https://cdn.cnn.com/cnnnext/dam/assets/200724205055-standardized-test-bubble-sheet-stock-large-169.jpg',
            title: 'Twingle Terrier',
            artist: 'Shibby Nam',
            price: 5
         });
        // return <h2>No Artwork on display! 😱 </h2>
     }
   
     function flookTron (e) {
        console.log('You clicked a flook tron.', fetch);
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
                        
                        <div className="btn btn-primary col mx-3" onClick={flookTron}>Vote</div>
                        <a href="#" className="btn btn-primary col mx-3">Buy ${artwork.price}</a>

                    </div>
                </div>
            </div> 
        </div>
        ))}
        </div>
    );
};

export default ArtContainer;
