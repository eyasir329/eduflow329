const express = require("express");
const connection = require("../../sql/db.js");

const router = express.Router();

router.get("/schoolInfo", (req, res) => {
    const sqlSchool = 'SELECT * FROM school';
    const sqlPrincipals = 'SELECT * FROM principals';
    const sqlTeaches = 'SELECT * FROM teaches';
    const sqlAddresses = 'SELECT * FROM addresses';
    
    // Use Promise.all to execute all queries concurrently
    Promise.all([
        executeQuery(sqlSchool),
        executeQuery(sqlPrincipals),
        executeQuery(sqlTeaches),
        executeQuery(sqlAddresses)
    ])
    .then(results => {
        const [schoolInfo, principalsInfo, teachesInfo, addressesInfo] = results;

        res.status(200).json({
            message: "Data fetched successfully",
            schoolInfo,
            principalsInfo,
            teachesInfo,
            addressesInfo
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Internal Server Error", message: "Error fetching data from tables" });
    });
});

// Helper function to execute a SQL query
function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = router;
