const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (await User.findOne({ email })) {
        return res.status(400).send("You already have an account with this email");
        }

        const user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        });

        const u = await user.save();
        const token = generateToken(u._id);

        res.status(200).json({ user: u, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Error");
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbuser = await User.findOne({ email });

        if (!dbuser) {
        return res.status(404).send("Invalid Credentials");
        }

        const isMatch = await bcrypt.compare(password, dbuser.password);
        if (!isMatch) {
        return res.status(400).send("Invalid password");
        }

        const token = generateToken(dbuser._id);
        res.status(200).json({ user: dbuser, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Error");
    }
};

module.exports = {userLogin,userSignUp};
