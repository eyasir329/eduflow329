
const connection = require("../api/sql/db.js");

// view
function getSocialData(social_id) {
    return new Promise((resolve, reject) => {
        const sqlSelectSocial = `SELECT * FROM socials WHERE social_id = ?`;

        connection.query(sqlSelectSocial, social_id, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    const socialData = results[0];
                    resolve(socialData);
                } else {
                    reject(new Error('No Social Data found'));
                }
            }
        });
    });
}


// update by id
function updateSocialData(socialId, socialData) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE socials SET ? WHERE social_id = ?`;
        connection.query(query, [socialData, socialId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// update or create
function updateOrCreateSocialData(socialId, socialData) {
    if (!socialId) socialId = 0;
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE socials SET ? WHERE social_id = ?`;
        connection.query(updateQuery, [socialData, socialId], (error, updateResults) => {
            if (error) {
                reject(error);
                return;
            }

            // If no rows were affected by the update, it means the social ID doesn't exist
            if (updateResults.affectedRows === 0) {
                // Insert new social data
                const insertQuery = `INSERT INTO socials SET ?`;
                connection.query(insertQuery, socialData, (error, insertResults) => {
                    if (error) {
                        reject(error);
                    } else {
                        // Resolve with the newly inserted social ID
                        resolve(insertResults.insertId);
                    }
                });
            } else {
                // Resolve with the provided social ID
                resolve(socialId);
            }
        });
    });
}

// get socialId from userId
const selectSocialIdFromUsers = async (userId) => {
    return new Promise((resolve, reject) => {
        // Prepare the SQL query
        const query = `
        SELECT social_id 
        FROM users 
        WHERE user_id = ?
      `;

        // Execute the query
        connection.query(query, [userId], (error, results) => {
            if (error) {
                console.error('Error selecting social_id from users:', error);
                reject(error);
                return;
            }

            // Resolve with the result (or undefined if no result found)
            resolve(results[0]);
        });
    });
};




module.exports = { getSocialData, updateSocialData, updateOrCreateSocialData, selectSocialIdFromUsers };
