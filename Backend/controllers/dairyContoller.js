const Dairy = require("../models/Dairy.js");

const createDairy = async (req, res) => {
  try {
    const dairy = new Dairy({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.user.id
    });

    await dairy.save();
    res.status(201).json(dairy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getDairy = async (req, res) => {
  try {
    const dairies = await Dairy.find({ user: req.user.id });
    if(dairies == null) {
        res.json("No entrys by uuser");
    }
    res.json(dairies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getDairyById = async (req, res) => {
  try {
    const dairy = await Dairy.findOne({ _id: req.params.id});
    if (!dairy) {
        return res.status(404).json({ message: "Dairy not found" });
    }
    res.json(dairy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDairy = async (req, res) => {
  try {
    const dairy = await Dairy.findOne({ _id: req.params.id});
    if (!dairy) return res.status(404).json({ message: "Dairy not found" });

    if (req.body.title != null) {
        dairy.title = req.body.title;
    }
    if (req.body.description != null) {
        dairy.description = req.body.description;
    }

    const updatedDairy = await dairy.save();
    res.json(updatedDairy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDairy = async (req, res) => {
  try {
    const dairy = await Dairy.findOne({ _id: req.params.id});
    if (!dairy) return res.status(404).json({ message: "Dairy not found" });

    await dairy.deleteOne();
    res.json({ message: "Dairy deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDairy,
  getDairy,
  getDairyById,
  updateDairy,
  deleteDairy
};
