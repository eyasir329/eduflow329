const connection = require("../sql/db.js");
const bcrypt = require("bcrypt");
const { updateUserInfo } = require("../../helper/getUserInfo.js");
const { getAddressId } = require("../../helper/getAddressData.js");
const { updateSocialData } = require("../../helper/getSocialData.js");
const { errorHandler } = require("../utils/error.js");

// profile section
exports.userUpdateProfile = async (req, res, next) => {
    try {
        const data = req.body;
        const type = req.params.role;

        console.log(data, type);

        const userId = data.userId;
        const socialId = data.socialId;

        const socialData = {
            phone: data.phoneNumber,
            facebook: data.facebook,
            linkedin: data.linkedin,
            twitter: data.twitter
        };

        updateSocialData(socialId, socialData);

        const addressData = {
            city: data.city,
            division: data.state,
            zip: data.zip
        };

        try {
            const address_id = await getAddressId(addressData);

            const userData = {
                first_name: data.firstName,
                last_name: data.lastName,
                profile_pic: data.profilePicture,
                street_address: data.streetAddress,
                address_id: address_id
            };

            updateUserInfo(userId, userData)
                .then((results) => {
                    console.log('User information updated successfully:', results);
                    res.status(200).json({ message: 'User information updated successfully' });
                })
                .catch((error) => {
                    console.error('Error updating user information:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        } catch (error) {
            console.error('Error updating user information:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// sign in update
exports.updateUser = async (req, res, next) => {

    const paramId = parseInt(req.params.id);
    if (req.user.id !== paramId) {
        return next(errorHandler(401, "You can update only your account"));
    }

    try {
        let values = [];
        let query = `UPDATE user_status 
                     INNER JOIN users ON user_status.user_id = users.user_id
                     INNER JOIN socials ON users.social_id = socials.social_id
                     SET `;

        if (req.body.email) {
            query += `socials.email = ?, `;
            values.push(req.body.email);
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            query += `user_status.password = ?, `;
            values.push(hashedPassword);
        }

        // Remove the last comma and space
        query = query.slice(0, -2);

        query += ` WHERE user_status.user_id = ?`;
        values.push(req.params.id);

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Error updating user:', error);
                return next(error);
            }

            if (results.affectedRows === 0) {
                return next(errorHandler(404, "User not found"));
            }

            res.status(200).json({ success: true, message: 'User updated successfully' });
        });
    } catch (error) {
        console.error('Error updating user:', error);
        next(error);
    }
}

// exports.deleteUser = async (req, res, next) => {
//     try {
//         // Ensure the authenticated user is the owner of the account
//         if (req.user.id != req.params.id) {
//             return next(errorHandler(401, "You can delete only your account"));
//         }
//         // Check if the user exists
//         const deletedUser = await User.findByIdAndDelete(req.params.id);

//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         // Send a JSON response upon successful deletion
//         res.status(200).json({ message: "User has been deleted successfully." });
//     } catch (error) {
//         // Pass the error to the error-handling middleware
//         next(error);
//     }
// };

