const Location = require("../models/locationModel");


// get all Locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add one Location
const addLocation= async (req, res) => {
  try {
    const { name, address, latitude,longitude } = req.body;
    const newLocation = new Location({ name, address, latitude, longitude });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "try again later" });
  }
};

// Delete Location by ID
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete({ _id: id });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Locations
const deleteAllLocations = async (req, res) => {
  try {
    const result = await Location.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} Locations successfully` });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "try again later" });
  }
};

module.exports = {
  getLocations,
  addLocation,
  deleteLocation,
  deleteAllLocations,
};

