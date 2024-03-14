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
        const dataQuery = `SELECT * FROM positions WHERE position_name = ?`;
        connection.query(dataQuery, positionName, (error, results) => {
            if (error) {
                console.error('Error querying data from MySQL:', error);
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0].position_id);
                } else {
                    reject(new Error('No position found'));
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
