
const Location = require("../models/locationModel");


// Render Controller: Render index.html with Location using EJS
const renderLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.render("../views/index", { locations }); // Render index.ejs with Locations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Get Location by ID
const renderLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.render("notfound");
    }
    res.render("singlelocation", { location }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Goal:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addlocation"); // Assuming "addgoal.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new goal (used for rendering and API)
const addLocation = async (req, res) => {
  try {
    const { name, address, latitude,longitude } = req.body;
    // Convert the achieved field to a Boolean
  //  const achieved = req.body.achieved === "on";
    const newLocation = new Location({ name, address, latitude,longitude});
    await newLocation.save();
    // Redirect to the main page after successfully adding the goal
    console.log("Location added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding Location:", error);
    res.status(500).render("error");
  }
};

// Delete Location by ID
const deleteLocation= async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Location.findByIdAndDelete({ _id: id });
    if (!goal) {
      return res.status(404).render("notfound");
    }
    console.log("Location delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Location:", error);
    res.status(500).render("error");
  }
};


// Update Goal by ID
const renderUpdateLocation = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the goal by id
    const location = await Location.findById(id);

    if (!location) {
      return res.render("notfound");
    }

    // Render the singlegoal.ejs template with the goal data
    res.render("updatelocation", { location });

  } catch (error) {
    console.error("Error fetching Location:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the goal
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    //const achieved = req.body.achieved === "on";
    const { name, address, latitude,longitude} = req.body;
    const updatedLocationData = { name, address, latitude,longitude };

    // Update the goal with the new data
    const updatedLocation = await Location.findOneAndUpdate({ _id: id }, updatedLocationData, { new: true });

    if (!updatedLocation) {
      return res.render("notfound");
    }

    console.log("Location updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Location:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderLocations,
  renderLocation,
  addLocation,
  renderForm,
//  deleteLocation,
//  updateLocation,
 // renderUpdateLocation,
};