// when user register we also create user's profile at the same time (controller)

const userProfileModel = require("../models/userProfileModel");

const userProfileController = (req, res) => {
    const data = req.body;
    const userName = data.name;
    const userEmail = data.email;

    const newUserProfile = new userProfileModel(
        {
            name: userName,
            email: userEmail,
        }
    );

    newUserProfile
        .save()
        .then((data) => {
            res
                .status(201)
                .json({message: "User profile added successfully", data});
        })
        .catch((err) => {
            res.status(500).json({message: "Error Occured!", err});
        });
};

module.exports = userProfileController;
