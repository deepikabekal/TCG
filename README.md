# The Community Gallery - TCG

## Description
An application that will feature unique paintings, sculptures, mosaics, prints, crafts, photographs etc created by the various artists. The artists can sign up and upload their artwork. The art will then be available for users and visitors to vote. Once any art has more than 10 votes it will be available purchase.

## Deployed App

## Screenshots

## User Story
````
AS A marketing agency
I WANT a codebase that follows accessibility standards
SO THAT our own site is optimized for search engines
````

## Acceptance Criteria
```
GIVEN a webpage meets accessibility standards
WHEN I view the source code
THEN I find semantic HTML elements
WHEN I view the structure of the HTML elements
THEN I find that the elements follow a logical structure independent of styling and positioning
WHEN I view the image elements
THEN I find accessible alt attributes
WHEN I view the heading attributes
THEN they fall in sequential order
WHEN I view the title element
THEN I find a concise, descriptive title
```

## Technologies
Front-end libraries
- React.js
- Apollo client

Backend libraries
- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB / Mongoose
- JWT
- Bcrypt

Dev Dependencies
- Nodemon
- Concurrently

## Save project to local
1. Git clone the repo in the desired local folder
````
git clone git@github.com:deepikabekal/Project-3.git
````
2. Cd to the root folder of the project and install all the dependencies (client and server side)
````
npm install
````
3. Request the .env file and insert it in the /server folder. That file contains the jwt secret

## Usage
1. Cd to the root folder and start the project (client and server concurrently)
````
npm run develop
````
2. The client should automatically open at http://localhost:3000
3. To access GraphQL Playground queries and mutations, go to http://localhost:3001/graphql

## Developers
- Deepika B
- Heather S
- Chaitali P
- Lucile T
