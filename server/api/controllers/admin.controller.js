const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const connection = require("../sql/db.js");

// extra function start
function getAddressId(addressValues) {
    return new Promise((resolve, reject) => {
        const sqlSelectAddress = `SELECT address_id FROM addresses WHERE city = ? AND division = ? AND zip = ? AND street_address = ?`;

        connection.query(sqlSelectAddress, addressValues, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    // Address already exists, retrieve the ID
                    const addressId = results[0].address_id;
                    console.log('Address already exists in MySQL with ID:', addressId);
                    resolve(addressId);
                } else {
                    // Address does not exist, insert a new record
                    const sqlCreateSchool = `INSERT INTO addresses (city, division, zip, street_address) VALUES (?, ?, ?, ?)`;

                    connection.query(sqlCreateSchool, addressValues, (error, results) => {
                        if (error) {
                            console.error('Error inserting data into MySQL:', error);
                            reject(error);
                        } else {
                            const addressId = results.insertId;
                            console.log('New address inserted into MySQL with ID:', addressId);
                            resolve(addressId);
                        }
                    });
                }
            }
        });
    });
}

function getSocialId(email, phone, facebook, linkedin, twitter) {
    return new Promise((resolve, reject) => {
        const sqlSelectSocial = `SELECT social_id FROM socials WHERE email = ? AND phone = ? AND facebook = ? AND linkedin = ? AND twitter = ?`;
        const socialValues = [email, phone, facebook, linkedin, twitter];

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
// extra function end

exports.schoolView = async (req, res, next) => {
    const eiin_number = 109873; 

    try {
        const sqlSelectSchool = `
            SELECT s.*, so.email, so.phone, so.facebook, so.linkedin, so.twitter, a.city, a.division, a.zip, a.street_address
            FROM school s
            LEFT JOIN socials so ON s.social_id = so.social_id
            LEFT JOIN addresses a ON s.address_id = a.address_id
            WHERE s.eiin_number = ?
        `;

        // Execute the query
        connection.query(sqlSelectSchool, eiin_number, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                if (results.length > 0) {
                    // School found, return its information
                    res.status(200).json(results[0]);
                } else {
                    // School not found with the provided EIIN
                    res.status(404).json({ error: 'School not found' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.schoolCreateOrUpdate = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);

        // Create address id
        const city = data.city;
        const division = data.division;
        const zip = data.zip;
        const street_address = data.street_address;

        const addressValues = [city, division, zip, street_address];
        const address_id = await getAddressId(addressValues);

        // Create social id
        const email = data.email;
        const phone = data.phone;
        const facebook = data.facebook;
        const linkedin = data.linkedin;
        const twitter = data.twitter || "";

        const social_id = await getSocialId(email, phone, facebook, linkedin, twitter);

        // Create school
        const school_name = data.school_name;
        const eiin_number = data.eiin_number;
        const established_at = data.established_at;
        const history = data.history;
        const logo = data.logo;

        const schoolInfo = [school_name, eiin_number, established_at, history, logo, social_id, address_id];

        const sqlInsertOrUpdateSchool = `
            INSERT INTO school (school_name, eiin_number, established_at, history, logo, social_id, address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            school_name = VALUES(school_name),
            established_at = VALUES(established_at),
            history = VALUES(history),
            logo = VALUES(logo),
            social_id = VALUES(social_id),
            address_id = VALUES(address_id)
        `;

        connection.query(sqlInsertOrUpdateSchool, schoolInfo, (error, results) => {
            if (error) {
                console.error('Error inserting or updating data into MySQL:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Data inserted or updated successfully into MySQL:', results);
                res.status(200).json({ success: true, message: 'Data inserted or updated successfully' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



