const connection = require("../api/sql/db.js");

function getAddressData(addressValues) {
    return new Promise((resolve, reject) => {
        const sqlSelectAddress = `SELECT * FROM addresses WHERE address_id=?`;

        connection.query(sqlSelectAddress, addressValues, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    const addressData = results[0];
                    resolve(addressData);
                } else {
                    reject(new Error('No address found'));
                }
            }
        });
    });
}

function getAddressId(addressData) {
    return new Promise((resolve, reject) => {
        if (!addressData) {
            reject(new Error('Address data is required'));
            return;
        }

        const { street_address, city, division, zip } = addressData;
        const sqlSelectAddress = `SELECT address_id FROM addresses WHERE street_address=? AND city=? AND division=? AND zip=?`;
        connection.query(sqlSelectAddress, [street_address, city, division, zip], (error, results) => {
            if (error) {
                console.error('Error querying address from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    const addressId = results[0].address_id;
                    resolve(addressId);
                } else {
                    // Create a new address record
                    const sqlInsertAddress = `INSERT INTO addresses (street_address, city, division, zip) VALUES (?, ?, ?, ?)`;
                    connection.query(sqlInsertAddress, [street_address, city, division, zip], (error, result) => {
                        if (error) {
                            console.error('Error creating new address in MySQL:', error);
                            reject(error);
                        } else {
                            const newAddressId = result.insertId;
                            resolve(newAddressId);
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getAddressData, getAddressId };
