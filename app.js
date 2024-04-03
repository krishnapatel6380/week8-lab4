const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const locationAPI = require("./controllers/locationAPIController");
const locationSSR = require("./controllers/locationSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with locations using EJS
app.get("/", locationSSR.renderLocations);
// Define a route to render the addlocation.ejs view
app.get("/addlocation", locationSSR.renderForm);
// Route to add  location using EJ
app.post("/addlocation", locationSSR.addLocation);
// Define a route to render the singlelocation.ejs view
app.get("/single-location/:id", locationSSR.renderLocation);

app.put("/single-location/:id", locationSSR.updateLocation);
// Define goal to update
app.get("/single-location/update/:id", locationSSR.renderUpdateLocation);

// API
// GET all Locations
app.get("/api/locations", locationAPI.getLocations);
// POST a new Location
app.post("/api/locations", locationAPI.addLocation);
// GET a single Location
//app.get("/api/locations/:id", locationAPI.getLocation);
// Update Location using PUT
//app.put("/api/locations/:id", blogAPI.updateLocation);
// DELETE a Location
//app.delete("/api/locations/:id", blogAPI.deleteLocation);
// DELETE all Location
//app.delete("/api/locations", locationAPI.deleteAllLocations);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});