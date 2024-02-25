const connection = require("../api/sql/db.js");

function getAddressId(addressValues) {
    // If any address value is undefined, set it to "N/A"
    addressValues = addressValues.map(value => value || "N/A");

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

module.exports = getAddressId;
