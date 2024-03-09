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

function positionCreate(positionData) {
    
}

module.exports = {getPositionData};
