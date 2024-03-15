const connection = require("../api/sql/db.js");

function getPositionData(positionId) {
    return new Promise((resolve, reject) => {
        const dataQuery = `SELECT * FROM positions WHERE position_id = ?`;
        connection.query(dataQuery, positionId, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject(new Error('No position found'));
                }
            }
        });
    });
}

function getPositionId(positionName) {
    return new Promise((resolve, reject) => {
        const checkQuery = `SELECT position_id FROM positions WHERE position_name = ?`;

        connection.query(checkQuery, positionName, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0].position_id);
                } else {
                    // If position doesn't exist, insert it into the database
                    const insertQuery = `INSERT INTO positions (position_name) VALUES (?)`;

                    connection.query(insertQuery, [positionName], (error, result) => {
                        if (error) {
                            console.error('Error inserting position into MySQL:', error);
                            reject(error);
                        } else {
                            resolve(result.insertId); // Resolve with the newly inserted position_id
                        }
                    });
                }
            }
        });
    });
}



// view position by id and name
function viewPositionData(req, res) {
    const query = 'SELECT position_id, position_name FROM positions';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error viewing position data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, positions: results });
        }
    });
}

module.exports = {getPositionData,getPositionId,viewPositionData};
