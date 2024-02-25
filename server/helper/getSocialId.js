const connection = require("../api/sql/db.js");

function getSocialId(email, phone, facebook, linkedin, twitter) {
    // If any social value is undefined, set it to "N/A"
    const socialValues = [email || "N/A", phone || "N/A", facebook || "N/A", linkedin || "N/A", twitter || "N/A"];

    return new Promise((resolve, reject) => {
        const sqlSelectSocial = `SELECT social_id FROM socials WHERE email = ? AND phone = ? AND facebook = ? AND linkedin = ? AND twitter = ?`;

        connection.query(sqlSelectSocial, socialValues, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    // Social info already exists, retrieve the ID
                    const socialId = results[0].social_id;
                    console.log('Social info already exists in MySQL with ID:', socialId);
                    resolve(socialId);
                } else {
                    // Social info does not exist, insert a new record
                    const sqlCreateSocial = `INSERT INTO socials (email, phone, facebook, linkedin, twitter) VALUES (?, ?, ?, ?, ?)`;

                    connection.query(sqlCreateSocial, socialValues, (error, results) => {
                        if (error) {
                            console.error('Error inserting data into MySQL:', error);
                            reject(error);
                        } else {
                            const socialId = results.insertId;
                            console.log('New social info inserted into MySQL with ID:', socialId);
                            resolve(socialId);
                        }
                    });
                }
            }
        });
    });
}

module.exports = getSocialId;
