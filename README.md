# mernStack_Dev
a small application built with React , Redux , Node , express , mongoDb , mongoose

# Quick_start
#install dependencies for server
npm start

#run the clent side with concurently
npm run dev

#run the Express server only
npm run server

#run the react client only
npm run client

#server runs on http://localhost:5000 and client on http://localhost:3000

You Will Need To Create a keys_dev.js in the server config folder With

module.exports = {
    MONGO_URL : 'YOUR_OWN_MONGO_URL' ,
    secretOrKey : 'YOUR_OWN_SECRET'
};
