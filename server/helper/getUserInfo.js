const connection = require("../api/sql/db.js");

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        const dataQuery = `SELECT * FROM users WHERE user_id = ?`;
        connection.query(dataQuery, userId, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject(new Error('No user found'));
                }
            }
        });
    });
}

function updateUserInfo(userId, userData) {
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
