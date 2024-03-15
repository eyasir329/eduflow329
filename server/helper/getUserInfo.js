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

// Define the selectKeyFromUserStatus function
const selectKeyFromUserStatus = async (userId) => {
    return new Promise((resolve, reject) => {
        // Prepare the SQL query
        const query = `SELECT \`key\` FROM user_status WHERE user_id = ?`;

        // Execute the query
        connection.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Error selecting key from user status:', error);
                reject(error);
                return;
            }

            // Resolve with the result (or undefined if no result found)
            resolve(results[0]);
        });
    });
};


const updateUserStatusCreationDate = async (userId, newCreationDate) => {
    try {
        // Execute the SQL query to update the user status creation date
        const query = `
            UPDATE user_status
            SET created_at = ?
            WHERE user_id = ?;
        `;
        
        // Execute the query with userId and newCreationDate parameters
        const [result] = await connection.promise().query(query, [newCreationDate, userId]);

        // Check if the query was successful
        if (result.affectedRows > 0) {
            // If rows were affected, the update was successful
            console.log(`User status creation date updated for user ${userId}`);
            return true; // Indicate success
        } else {
            // If no rows were affected, it means the user status wasn't found
            console.log(`User status not found for user ${userId}`);
            return false; // Indicate failure
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error updating user status creation date:', error);
        throw error; // Throw the error for handling at a higher level
    }
};


module.exports = { getUserInfo, updateUserInfo, selectKeyFromUserStatus,updateUserStatusCreationDate };
