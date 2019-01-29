const cors = require("cors-express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const routes = require("./routes");
const mongoose = require("mongoose");

//require db connection
require('./models');

// import favorite db
const Saved = require('./Saved');


app.use(cors(options));
// configure app to use bady parser to extract JSON from POST
// Middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static('./client/build'));
}

// Create momgoose connection 
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/googlebookfinder");
app.use(routes);

// // Make static assets available to UI
// app.use(express.static('./client/build'));
// // app.use(express.static('./client/build'));

const router = express.Router();
// Serve the UI over express server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
});

//Initialize API
router.get('/api', function(req, res){
  res.send('API initialized');
})

// //Register API routes
// app.use('/api', router);

// // Route for all records in collection
// router.route('/favorites')

//   // Add a favortie entry to the database
//   .post(function(req, res){
//     // Create an entry
//     const favorite = new Favorite();
//     favorite.title = req.body.title,
//     favorite.authors = req.body.authors,
//     favorite.rating = req.body.rating,
//     favorite.publisher = req.body.publisher,
//     favorite.publishedDate = req.body.publishedDate,
//     description = req.body.description,
//     favorite.thumbnail = req.body.thumbnail,
//     favorite.price = req.body.price,
//     favorite.purchase = req.body.purchase;

//     // Save the entry and check for errors
//     favorite.save(function(err){
//       if(err) {
//         res.send(err);
//       } else {
//         res.json({
//           message: 'Favorite added',
//           favorite: favorite
//         });
//       }
//     })    
//   })
  
//   // Retrieve all favorites from the database
//     .get(function(req, res){
//       Favorite.find(function(err, favorites){
//         if(err){
//           res.send(err);
//         } else {
//           res.json(favorites);
//         }
//       });
//     })

// // Route for specific records
// router.route('/favorites/:id')

//     // Remove a record permanently
//     .delete(function(req, res) {
//         Favorite.remove({_id: req.params.id}, function(err){
//           if(err){
//             res.send(err);
//           } else {
//             res.send("Record Removed");
//           }
//         })
//         res.status(204).end();
//     })

// Start the API server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
