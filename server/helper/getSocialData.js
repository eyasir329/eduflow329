
const connection = require("../api/sql/db.js");

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

async function getSocialUpdateId(userId, type, socialData) {
    return new Promise((resolve, reject) => {
        if (type === "admin" || type === "staff") {
            let query;
            
                query = `SELECT social_id FROM staffs WHERE staff_id = ?`;
            

            connection.query(query, [userId], (error, results) => {
                if (error) {
                    reject({ error: 'Database error' });
                    return;
                }

                if (results.length > 0) {
                    const socialId = results[0].social_id;
                    updateSocialData(socialId, socialData)
                        .then(() => resolve({ message: 'Social data updated successfully',socialId }))
                        .catch(error => reject({ error: 'Failed to update social data' }));
                } else {
                    reject({ error: 'User not found' });
                }
            });
        } else {
            reject({ error: 'Invalid user type' });
        }
    });
}

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

module.exports = { getSocialData, getSocialUpdateId };
