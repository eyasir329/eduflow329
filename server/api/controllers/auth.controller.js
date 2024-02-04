const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

exports.test = (req, res) => {
    res.json({
        message: "API is working"
    });
};

exports.signup = async (req, res, next) => {
    const { userId, userName, email, password, role } = req.body;

    if (
        !userId ||
        !userName ||
        !email ||
        !password ||
        !role ||
        userId === "" ||
        userName === "" ||
        email === "" ||
        password === "" ||
        role === ""
    ) {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            userId,
            userName,
            email,
            password: hash,
            role,
        });

        await newUser.save();
        res
            .status(201)
            .json({ status: "ok", message: "Account Created Successfully" });
    } catch (error) {
        next(error);
    }
};

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        const { password: hashedPassword, ...rest } = validUser._doc;

        const tokenPayload = { id: validUser._id};
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

        const expiryDate = new Date(Date.now() + 3600000); // 24 hours from now

        res.cookie("access_token", token, {expires: expiryDate})
            .status(200)
            .json(rest);

    } catch (error) {
        next(error);
    }
};

exports.google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 24 * 3600000);
            res
                .cookie("access_token", token, {
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            const fullName = req.body.name;
            const words = fullName.split(" ");
            const firstName = words[0].toLowerCase();

            const newUser = new User({
                userId: req.body.id,
                userName: firstName + Math.random().toString(10).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
                role: "notAllocated",
            });

            await newUser.save();

            const tokenPayload = { id: newUser._id};
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 24 * 3600000); //24 hr ... second
            res.cookie("access_token", token, {expires: expiryDate }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
