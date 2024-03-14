const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const connection = require("../sql/db.js");
// const User = require("../models/user.model.js");

exports.signup = async (req, res, next) => {
    const { userId, email, password, key } = req.body;
    console.log(userId, email, password, key)

    if (!userId || !email || !password || !key || userId === "" || email === "" || password === "" || key === "") {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Get the user status from the database
        connection.query('SELECT * FROM user_status WHERE user_id = ?', [userId], async (error, results) => {
            if (error) {
                console.error('Error:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0 || results[0].key !== key) {
                return res.status(401).json({ error: 'Invalid key' });
            }

            // Hash the password
            const hashPassword = await bcrypt.hash(password, 10);

            // Update user status with hashed password
            connection.query('UPDATE user_status SET password = ? WHERE user_id = ?', [hashPassword, userId], (error, results) => {
                if (error) {
                    console.error('Error:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Respond with success message
                res.status(201).json({ status: 'ok', message: 'Account Created Successfully' });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.signin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errorHandler(400, "Validation failed", errors.array()));
    }

    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM socials WHERE email = ?',
        email,
        async (error, validMail) => {
            if (error) {
                console.error('Error:', error);
                return next(errorHandler(500, "Internal server error"));
            }

            if (validMail.length === 0) {
                return next(errorHandler(404, "User not found"));
            }

            const social_id = validMail[0].social_id;

            connection.query(
                'SELECT u.*, us.password, us.user_type FROM users u INNER JOIN user_status us ON u.user_id = us.user_id WHERE u.social_id = ?',
                social_id,
                async (error, validUser) => {
                    if (error) {
                        console.error('Error:', error);
                        return next(errorHandler(500, "Internal server error"));
                    }

                    if (validUser.length === 0) {
                        return next(errorHandler(404, "User not found"));
                    }

                    const validPassword = await bcrypt.compare(password, validUser[0].password);
                    if (!validPassword) {
                        return next(errorHandler(400, "Invalid password"));
                    }

                    let position = null;
                    if (validUser[0].user_type === 'staff') {
                        connection.query(
                            'SELECT * FROM staffs WHERE staff_id = ?',
                            validUser[0].user_id,
                            async (error, staffData) => {
                                if (error) {
                                    console.error('Error:', error);
                                    return next(errorHandler(500, "Internal server error"));
                                }

                                if (staffData.length > 0) {
                                    const positionId = staffData[0].position_id;
                                    connection.query(
                                        'SELECT position_name FROM positions WHERE position_id = ?',
                                        positionId,
                                        async (error, positionData) => {
                                            if (error) {
                                                console.error('Error:', error);
                                                return next(errorHandler(500, "Internal server error"));
                                            }
                                            if (positionData.length > 0) {
                                                position = positionData[0].position_name;
                                            }

                                            const tokenPayload = { id: validUser[0].user_id };
                                            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
                                            const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

                                            res.cookie("access_token", token, { expires: expiryDate, httpOnly: true })
                                                .status(200)
                                                .json({
                                                    userId: validUser[0].user_id,
                                                    type: validUser[0].user_type,
                                                    position: position,
                                                    email: email
                                                });
                                        }
                                    );
                                }
                            }
                        );
                    } else {
                        const tokenPayload = { id: validUser[0].user_id };
                        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
                        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

                        res.cookie("access_token", token, { expires: expiryDate, httpOnly: true })
                            .status(200)
                            .json({
                                userId: validUser[0].user_id,
                                type: validUser[0].user_type,
                                email: email
                            });
                    }
                }
            );
        }
    );
};

exports.signoutUser = (req, res) => {
    res.clearCookie('access_token').status(200).json("Signout success");
}

// exports.google = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             const { password: hashedPassword, ...rest } = user._doc;
//             const expiryDate = new Date(Date.now() + 24 * 3600000);
//             res
//                 .cookie("access_token", token, {
//                     expires: expiryDate,
//                 })
//                 .status(200)
//                 .json(rest);
//         } else {
//             const generatedPassword =
//                 Math.random().toString(36).slice(-8) +
//                 Math.random().toString(36).slice(-8);
//             const hashedPassword = await bcrypt.hash(generatedPassword, 10);

//             const fullName = req.body.name;
//             const words = fullName.split(" ");
//             const firstName = words[0].toLowerCase();

//             const newUser = new User({
//                 userId: " ",
//                 userName: firstName + Math.random().toString(10).slice(-4),
//                 email: req.body.email,
//                 password: hashedPassword,
//                 profilePicture: req.body.photo,
//                 role: "notAllocated",
//             });

//             await newUser.save();

//             const tokenPayload = { id: newUser._id };
//             const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

//             const { password: hashedPassword2, ...rest } = newUser._doc;
//             const expiryDate = new Date(Date.now() + 24 * 3600000); //24 hr ... second
//             res.cookie("access_token", token, { expires: expiryDate }).status(200).json(rest);
//         }
//     } catch (error) {
//         next(error);
//     }
// };
