import React from 'react'

const Home = () => {
    const artList = [
        {
            name : 'Alena K',
            description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe aliquam enim fugiat ut quis rem repellat voluptate dolores fugit quo ea, excepturi consectetur perferendis doloremque aperiam architecto esse suscipit dicta!' ,
            artName : 'Gazing Cat' ,
            imageName : 'alena-k.jpg',
            votes : 6,
            price : 60,
        },
        {
            name : 'Enzo Tommasi',
            description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe aliquam enim fugiat ut quis rem repellat voluptate dolores fugit quo ea, excepturi consectetur perferendis doloremque aperiam architecto esse suscipit dicta!' ,
            artName : 'The Girl' ,
            imageName : 'enzo-tommasi.jpg',
            votes : 7,
            price : 70,
        },
        {
            name : 'Pawel Czerwinski',
            description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe aliquam enim fugiat ut quis rem repellat voluptate dolores fugit quo ea, excepturi consectetur perferendis doloremque aperiam architecto esse suscipit dicta!' ,
            artName : 'Fish In The Pond' ,
            imageName : 'pawel-czerwinski.jpg',
            votes : 8,
            price : 80,
        },
        
    ]
    return (
        <section>
            <div className=" card text-center card-homepage">
                <h2 className="h-margin p-2">
                    <span className="w-content bg-color text-color p-1">Let's empower creative community!</span>
                </h2>
                <p>
                    The Community Gallery features unique paintings, sculptures, mosaics, prints, crafts, photographs and much more. To feature your art on TCG login and upload images of art.
                </p>
                <p>
                    Browse the Gallery section to vote for your favorite art or purchase community selected art.
                </p>
            </div>
            <div>
                <h2 className="text-center bg-color p-2 text-color">Top 3 art of the day</h2>
                <div className="row row-cols-1 row-cols-md-3"> 
                    {artList.map((item) => (
                        <div className="col mb-4" key={item.name}>
                            <div className="card card-feature h-100">
                                <img src={require(`../Assets/${item.imageName}`).default} className="image img-thumbnail" alt="featured art"/>
                                <div className="card-body card-feature">
                                    <div className="justify-space-between-lg flex-row">
                                        <div>
                                            <h5 className="card-title text-color art-title-text">{item.artName}</h5>
                                            <p className="card-text">Artist: {item.name}</p>
                                        </div>
                                        <div className="flex-column text-center text-color">
                                            <span className="span-text ">{item.votes}</span>
                                            <span className="span-text ">${item.price}</span> 
                                        </div>
                                    </div>
                                    <p className="card-text">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </section>
    )
}

export default Home;
