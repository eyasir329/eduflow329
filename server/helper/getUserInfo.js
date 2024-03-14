const connection = require("../api/sql/db.js");
const { getAddressData } = require("./getAddressData.js");
const { getSocialData } = require("./getSocialData.js");

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        const dataQuery = `SELECT * FROM users WHERE user_id = ?`;
        const extraQuery = `SELECT created_at, updated_at FROM user_status WHERE user_id = ?`;
        connection.query(dataQuery, userId, async (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    const userData = results[0]; // Extract user data
                    try {
                        // Execute extraQuery to get additional user status data
                        connection.query(extraQuery, userId, async (error, extraResults) => {
                            if (error) {
                                console.error('Error querying extra data from MySQL:', error);
                                reject(error);
                            } else {
                                const addressData = await getAddressData(userData.address_id);
                                const socialData = await getSocialData(userData.social_id);
                                resolve({ userData, addressData, socialData, userStatusData: extraResults[0] });
                            }
                        });
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error('No user found'));
                }
            }
        });
    });
}


function updateUserInfo(userId, userData) {
    console.log(userData)
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE users SET ? WHERE user_id = ?`;
        connection.query(updateQuery, [userData, userId], (error, results) => {
            if (error) {
                console.error('Error updating user data in MySQL:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { getUserInfo, updateUserInfo };
